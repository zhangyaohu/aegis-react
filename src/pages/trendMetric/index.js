import React, { Component, Fragment } from 'react';
import SearchBox from '@components/searchBox';
import { Button, Tabs, DatePicker, Pagination } from 'antd';
import TrendMetricHttpApi from './http.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryList } from '@pages/tableSpace/store/actionCreator';
import { formatDateTime, getService, formatSize } from '@common/utils/utils';
import moment from 'moment';
import _ from 'lodash';
import LineMetric from '@components/metric';
import './trendMetric.less';

const { TabPane } = Tabs
const { RangePicker } = DatePicker
class TableSpaceList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectVal: 'tablespace',
			searchStr: '',
			pageIndex: 1,
			pageSize: 10,
			sortDirection: '-',
			data: [],
			loading: false,
			total: 0,
			sortBy: 'createDate',
			dataSet: [],
			chunkDataSet: [],
			tabs: [],
			currSelectTab: [],
			currSelectQuotaTab: 'core',
			quotaTabs: [
				{
					label: "core",
					value: "core"
				},
				{
					label: "host",
					value: "host"
				},
				{
					label: "trans",
					value: "trans"
				},
				{
					label: "network",
					value: "network"
				},
				{
					label: "alert",
					value: "alert"
				}
			],
			timeRange: [moment().startOf('day').subtract(7, 'days'), moment().endOf('day').subtract(1, 'days')],
			conditionNameList: [
				{
					name: '表空间',
					value: 'tablespace'
				}
			],
			colors: [
				{
					line: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#d8ace0"
							},
							{
								offset: 1,
								color: "#d8ace0"
							}
						],
						globalCoord: false
					},
					start: "rgba(216, 172, 224, 0.1)",
					end: "rgba(216, 172, 224, 0.3)"
				},
				{
					line: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#2175d9"
							},
							{
								offset: 1,
								color: "#2175d9"
							}
						],
						globalCoord: false
					},
					start: "rgba(33, 117, 217, 0.1)",
					end: "rgba(33, 117, 217, 0.4)"
				},
				{
					line: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#ff0000"
							},
							{
								offset: 1,
								color: "#ff0000"
							}
						],
						globalCoord: false
					},
					start: "rgba(255, 0, 0, 0.1)",
					end: "rgba(255, 0, 0, 0.2)"
				}
			],
			timerInterval: null
		}
	}

	setCondition = (searchStr, selectVal) => {
		this.setState({
			selectVal: selectVal,
			searchStr: searchStr
		})
	}

	componentDidMount() {
		let _this = this;
		_this.queryService().then(() => {
			_this.init();
			let timerInterval = setInterval(() => {
				_this.init();
			}, 5 * 60 * 1000);
			this.setState({
				timerInterval
			})
		});
	}

	//查询service
	queryService() {
		let _this = this;
		return TrendMetricHttpApi.queryMetric().then(resp => {
			this.setState({
				tabs: getService(resp.data),
			}, () => {
				this.setState({
					currSelectTab: this.state.tabs[0].value
				})
			})
		});
	}
	//查询条件
	getCondition = () => {
		let _this = this;
		return {
			[this.state.selectVal]: this.state.searchStr,
			starttime: formatDateTime(_this.state.timeRange[0], "yyyy-MM-dd hh:mm:ss"),
			endtime: formatDateTime(_this.state.timeRange[1], "yyyy-MM-dd hh:mm:ss"),
			sort: "-name",
			tags: _this.state.currSelectQuotaTab,
			service: _this.state.currSelectTab,
		};
	}
	//初始化查询
	init = () => {
		let _this = this, dataSet = [];
		//清空查询数据
		_this.setState({
			dataSet: [],
			pageIndex: 1,
			pageSize: 5
		}, () => {
			TrendMetricHttpApi.queryMetric(_this.getCondition()).then(resp => {
				//数据按照名称分组
				let data = _.groupBy(resp.data, o => {
					return o.name;
				});
				//整理数据
				for (let i in data) {
					dataSet.push(data[i]);
				}
				_this.setState({
					dataSet,
				}, () => {
					this.setState({
						total: _this.state.dataSet.length,	//总条数
						chunkDataSet: _.chunk(_this.state.dataSet, _this.state.pageSize),//将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组
					})
				})
			});
		})
	}
	//设置画图数据
	setMetricData = (data, index) => {
		let _this = this,
			dataList = [];
		if (!!data) {
			//整理画图数据形式为[[当前值],[最后值],[最近一天]]
			dataList = [
				data.map(item => {
					return {
						time: new Date(item.gmt_modified).getTime(),
						value: item.currval,
						label: "currval"
					};
				}),
				data.map(item => {
					return {
						time: new Date(item.gmt_modified).getTime(),
						value: item.lastval,
						label: "lastval"
					};
				}),
				data.map(item => {
					return {
						time: new Date(item.gmt_modified).getTime(),
						value: item.last1d,
						label: "lastday"
					};
				})
			];
			return _this.reorganizeData(
				dataList, //对应画图数据
				`${_this.state.currSelectTab}-${data[0].name}`, //对应图表名称
				formatSize, //对应数据展示格式
				_this.state.colors, //对应相应颜色
				data[0].sname, //对应纵轴名称
				index
			);
		}
	}
	toggleTab = (tab) => {
		let _this = this;
		if (tab === _this.state.currSelectTab) return;
		_this.setState({
			currSelectTab: tab,
			pageIndex: 1
		}, () => {
			_this.init();
		})
	}
	toggleQuota = (tab) => {
		let _this = this;
		if (tab === _this.state.currSelectQuotaTab) return;
		_this.setState({
			currSelectQuotaTab: tab,
			pageIndex: 1
		}, () => {
			_this.init();
		})
	}
	reorganizeData = (dataList, title, func, color, sname, order) => {
		let _this = this,
			avaerage = 0,
			max = 0,
			value = [];
		dataList.forEach((item, index) => {
			let values = [];
			if (!item) item = [];
			//数据按照时间分组
			let data = _.groupBy(item, o => {
				return o.time;
			});
			//遍历时间
			for (let key in data) {
				let _value;
				//按时间分组求和求某一时间下的平均值
				_value =
					_.sumBy(data[key], function (o) {
						return o.value;
					}) / data[key].length;
				values.push({
					time: key,
					value: _value
				});
			}
			//计算平均值与最大值
			if (values.length > 0) {
				avaerage = _.sumBy(values, it => it.value) / values.length;
				let maxValue = values.map(it => it.value);
				max = _.max(maxValue);
			}
			value.push({
				values,
				color: color[index],
				avaerage: avaerage,
				max: max,
				label: item[0].label
			});
		});
		return {
			dataList: value,
			title,
			func,
			color,
			sname,
			order
		};
	}

	handleTableChange = (pageIndex, pageSize) => {
		if (this.state.pageIndex !== pageIndex && this.state.pageSize === pageSize)
			this.setState({ pageIndex: pageIndex });
		if(this.state.pageIndex === pageIndex && this.state.pageSize !== pageSize) {
			this.setState({
				pageIndex: 1,
				pageSize: pageSize
			}, () => {
				this.setState({
					chunkDataSet: _.chunk(this.state.dataSet, this.state.pageSize)
				})
			})
		}
	}

	handleTime = (time) => {
		this.setState({
			timeRange: [time[0], time[1]]
		})
	}

	getCharts = () => {
		if (this.state.chunkDataSet.length > 0) {
			return this.state.chunkDataSet[this.state.pageIndex - 1].map((data, index) => {
				return (
					<Fragment key={index}>
						<div className="trend-metric__chart_title">
							Graph Kind: {data[0].type} | {data[0].service} -
               <a className="a-link">{data[0].name}</a>-
               <a className="a-link">history</a>
						</div>
						<LineMetric value={{ data: this.setMetricData(data, index) }}></LineMetric>
					</Fragment>
				)
			})
		} else {
			return null;
		}
	}

	render() {

		return <Fragment>
			<div className='page-header'>
				<div className='page-title'>关键指标趋势</div>
				<Tabs defaultActiveKey="2" onChange={this.toggleTab}>
					{
						this.state.tabs.map((it, index) => {
							return (<TabPane key={it.value} tab={it.label}></TabPane>)
						})
					}
				</Tabs>
			</div>
			<div className='page-toolbar'>
				<SearchBox conditionNameList={this.state.conditionNameList} handleInput={this.setCondition}></SearchBox>
				<RangePicker
					defaultValue={this.state.timeRange}
					style={{ 'paddingLeft': '10px' }}
					showTime
					value={this.state.timeRange}
					onChange={this.handleTime}
				/>
				<Button className='search-btn' type="primary" onClick={this.init}>搜索</Button>
			</div>
			<div>
				<Tabs defaultActiveKey="2" onChange={this.toggleQuota}>
					{
						this.state.quotaTabs.map((it, index) => {
							return (<TabPane key={it.value} tab={it.label}>
								{
									this.getCharts()
								}
							</TabPane>)
						})
					}
				</Tabs>
				{
					this.state.total > 0 ? <Pagination
					total={this.state.total}
					showTotal={total => `共 ${total} 条`}
					pageSize={this.state.pageSize}
					defaultCurrent={this.state.pageIndex}
					onChange={this.handleTableChange}
					pageSizeOptions={['5','10']}
					showSizeChanger
					onShowSizeChange={this.handleTableChange}
				/> : null
				}
			</div>
		</Fragment>
	}
}

const mapStateToProps = (state) => ({
	result: state.getIn(['tableSpace', 'result']),
})
//mapDispatch异步操作触发action然后通过reducer来改变状态树的值
const mapDispatchToProps = (dispatch, ownerProps) => ({
	actions: bindActionCreators({
		queryList,
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableSpaceList)