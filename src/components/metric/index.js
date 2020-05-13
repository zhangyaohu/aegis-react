import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { formatDateTime } from '@common/utils/utils';
import echarts from '@common/charts'
import './metric.less';
import { object } from 'prop-types';

class LineMetric extends Component {
	constructor (props) {
		super(props);
		this.state = {
      colors: [],
      isLoad: false,
      nodata: false,
      metricLabel: [],
			sname: "",
			prevOrder: null,
      options: {
        title: {
          textStyle: {
            color: "#f7aa4d", //颜色
            fontStyle: "normal", //风格
            fontWeight: "normal", //粗细
            fontFamily: "Microsoft yahei", //字体
            fontSize: 14 //大小
          },
          textAlign: "center", //水平对齐,
          left: "50%"
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          formatter: function(param) {
            let str = `<div style="padding: 0px 30px;opcity: 0;box-size: border-box;border-radius: 2px; background: #fff;display: inline-block">
            <div>${param[0].axisValueLabel}</div>`;
            for (let i in param) {
              str += `<div style="padding: 5px 0px;">
                 <span style="display: inline-block;width: 10px;height: 10px; background:${param[i].color.colorStops[1].color}"></span>
                 <span style="dispaly: inline-block;color: #222;">${param[i].seriesName}\r\t${param[i].value}</span>
               </div>`;
            }
            str += `</div>`;
            return str;
          },
          backgroundColor: "rgba(255,255,255,0.98)",
          borderColor: "#EEF3F7",
          borderWidth: 1,
          extraCssText:
            "box-shadow: 0 2px 4px 0 rgba(217,225,233,0.40);border-radius: 2px;padding: 10px;",
          textStyle: {
            color: "#5E6978",
            fontFamily: "PingFangSC-Regula",
            fontSize: "12"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#555",
              opacity: 0.9,
              type: "dashed"
            }
          },
          axisLabel: {
            fontSize: 12,
            align: "center",
            color: "#f7aa4d"
          },
          axisLine: {
            color: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: "red" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "blue" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            },
            lineStyle: {
              color: "#369"
            }
          }
        },
        yAxis: {
          type: "value",
          name: "sess/5min",
          nameLocation: "middle",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#555",
              opacity: 0.9,
              type: "dashed"
            }
          },
          nameTextStyle: {
            color: "#f7aa4d",
            fontWeight: "300",
            padding: [10, 20, 20, 0],
            fontSize: 16
          },
          axisLine: {
            color: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: "red" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "blue" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            },
            lineStyle: {
              color: "#f7aa4d"
            }
          }
        },
        series: []
      }
		}
	}
	
	componentDidMount() {
		let _this = this;
    //获得图标dom;
		_this.setState({
			prevData: _this.props.value.data
		})
    //初始化表格数据
    _this.initMetricData(_this.props.value.data);
    window.addEventListener("resize", _this.resizeChart);
	}


	initMetricData = (data) => {
		let _this = this;
		_this.setState({
			metricLabel: [],
			prevOrder: data.order
		})
		//如果含有title则标题为title
		if (_.has(data, "title")) {
			let options = Object.assign(_this.state.options,{title: {text: data.title}});
			_this.setState({
			 	options
			})
		}
		//如果含又dataList则整理数据
		if (_.has(data, "dataList")) {
			//load为true
			this.setState({
				isLoad : true,
				title : data.title,
				sname : data.sname
			})
			if (data.dataList.length > 1) {
				let metricLabel = []
				data.dataList.forEach((it, index) => {
					//设置当前值
					let currentValue = _.last(it.values).value;
					currentValue = _.has(_this.props.value.data, "func")
						? _this.props.value.data.func(currentValue)
						: currentValue;
					//格式化当前值设置当前值label以及颜色
					metricLabel.push({
						value: currentValue,
						color: it.color.line.colorStops[1].color,
						text: it.id,
						max: _.has(_this.props.value.data, "func")
							? _this.props.value.data.func(it.max)
							: it.max,
						avaerage: _.has(_this.props.value.data, "func")
							? _this.props.value.data.func(it.avaerage)
							: it.avaerage,
						label: it.label
					});
				});
				this.setState({
					metricLabel
				})
			} else {
				//如果是单一数据时当前值
				let currentValue = _.last(_this.props.value.dataList[0].values).value;
				//格式化当前值
				_this.currentValue = _.has(_this.props.value.data, "func")
					? _this.props.value.data.func(currentValue)
					: currentValue;
			}
		}
		_this.drawChart(
			_this.props.value.data.dataList,
			_this.state.options,
			_this.props.value.data.func,
			_this.props.value.data.name
		);
	}

	drawChart = (dataList, option, formatter, name) => {
		let _this = this;
		if (!dataList) {
			this.setState({
				nodata: true
			})
			return;
		}
		this.setState({
			colors: []
		})
		let timeLine = _this.getTimeLine(dataList);
		let series = [];
		//设置基线
		let seriesLineBase = {
			type: "line",
			smooth: true,
			symbol: "circle",
			showSymbol: false,
			data: series[0],
			lineStyle: {
				normal: {
					width: 2,
					color: "#0088EF"
				}
			},
			areaStyle: {
				normal: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [],
						globalCoord: false // 缺省为 false
					}
				}
			}
		};
		let colors = [];
		//遍历数据设置线条颜色设置图片数据series;
		dataList.forEach(it => {
			let newLine = _.cloneDeep(seriesLineBase);
			newLine.data = it.values.map(item => item.value);
			newLine.name = it.label;
			newLine.lineStyle.normal.color = it.color.line;
			newLine.areaStyle.normal.color.colorStops.push(
				{
					offset: 0,
					color: it.color.start
				},
				{
					offset: 1,
					color: it.color.end
				}
			);
			newLine.itemStyle = {
				normal: {
					color: it.color.line
				}
			};
			colors.push(it.color.end);
			series.push(newLine);
		});
		this.setState({
			colors
		})
		if (echarts.init(_this.refs["chart-content"])) {
			//克隆画图配置选项
			let _option = _.cloneDeep(option);
			//格式化y轴坐标
			//_option.yAxis.axisLabel.formatter = formatter;
			//格式化x轴坐标
			_option.xAxis.data = timeLine;
			//画图数据赋值
			_option.series = series;
			//设置纵轴标题
			_option.yAxis.name = _this.sname ? _this.sname + "/5min" : "";
			//画图表
			echarts.init(_this.refs["chart-content"]).setOption(_option);
			_this.resizeChart();
		  _this.setState({
				isLoad: false,
				nodata: false
			})
		}
	}

	//格式化x轴
	getTimeLine = (dataList) => {
		if (!dataList) return;
		if (dataList && !dataList[0]) return;
		let showday = false;
		showday =
			dataList[0].values[1] && dataList[0].values[0]
				? dataList[0].values[1].time - dataList[0].values[0].time >
				 12 * 30 * 24 * 60 * 60 * 1000
				: false;
		let timeLine;
		if(dataList.length > 0 && showday) {
			if(!_.isUndefined(dataList[0])) {
				timeLine = dataList[0].values.map(item => {
					return formatDateTime(Number(item.time), "yyyy-MM-dd");
				});
			}
		}else {
			if (!_.isUndefined(dataList[0])) {
				timeLine = dataList[0].values.map(item => {
					return formatDateTime(Number(item.time), "yyyy-MM-dd hh:mm:ss");
				});
			}
		}
		return timeLine;
	}

	//设置x轴显示几个坐标点
	resizeChart = (e) => {
		let _this = this;
		 if(echarts.init(_this.refs["chart-content"]))
		 echarts.init(_this.refs["chart-content"]).resize();
	}
	
	componentWillReceiveProps(nextProps) {
		// if(nextProps.value.data.order !== this.state.prevOrder)
		this.initMetricData(nextProps.value.data);
	}

	getContent = () => {
		if(!this.state.isLoad) {
			return 	(
				<Fragment>
					<div ref="chart-content" className="line-metric__content"></div>
					{
						this.state.metricLabel ? this.state.metricLabel.map((data, index) => {
							return (<div className="line-metric__lengend" key={index}>
                  <div className="line-metric__lengend-item">
										<span className="line-metric__lengend-item__label" style={{'background': data.color}}></span>
										<span className="line-metric__lengend-item__value_label">{this.state.sname}</span>
										<span className="line-metric__lengend-item__value_label">{data.label}:</span>
										<span className="line-metric__lengend-item__value">{data.value}</span>
										<span className="line-metric__lengend-item__value_label">Avagerage:</span>
										<span className="line-metric__lengend-item__value">{data.avaerage}</span>
										<span className="line-metric__lengend-item__value_label">Max:</span>
										<span className="line-metric__lengend-item__value">{data.max}</span>
                  </div>
							</div>)
						}) : null
					}
				</Fragment>
			)
		}else {
      return (
				<div style={{width: '100%', textAlign: 'center', height: '100%', position: 'absolute',lineHeight: '40vh'}}
         >
       <span className="table-nodata">
        <p className="empty-text">暂无数据</p>
      </span>
    </div>
			)
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", () => echarts.init(_this.refs["chart-content"]).resize());
	}

	render() {
		return (
			<div className="line-metric">
        {
					this.getContent()
				}
      </div>
		)
	}
}

export default LineMetric;