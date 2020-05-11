import React, { Component, Fragment } from 'react';
import SearchBox from '@components/searchBox';
import { Button, Table } from 'antd';
import tableSpaceHttp from './http.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryList } from '@pages/tableSpace/store/actionCreator';
import { formatDateTime } from '@common/utils/utils';

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
			total: 200,
			sortBy: 'createDate',
			conditionNameList: [
				{
					name: '表空间',
					value: 'tablespace'
				}
			]
		}
	}

	getCondition() {
		return {
			[this.state.selectVal]: this.state.searchStr,
			start: (this.state.pageIndex - 1) * this.state.pageSize,
			limit: this.state.pageSize,
			sort: `${this.state.sortDirection}${this.state.sortBy}`
		}
	}

	setCondition = (searchStr, selectVal) => {
		this.setState({
			selectVal: selectVal,
			searchStr: searchStr
		})
	}

	componentDidMount() {
		this.queryList();
	}

	queryList = () => {
		this.setState({ loading: true }, () => {
			tableSpaceHttp.queryList(this.getCondition())
			.then((resp) => {
				this.props.actions.queryList(resp);
				this.setState({ loading: false, data: this.props.result.data, total: this.props.result.total });
			})
		});
	}

	handleTableChange = (pagination, filters, sorter) => {
		if(this.state.pageIndex !== pagination.current || this.state.pageSize !== pagination.pageSize)
		this.setState({pageIndex: pagination.current, pageSize: pagination.pageSize }, () => {
			this.queryList();
		});
		let sortFlag = sorter.order === "ascend" ? '+' : "-"
		if(this.state.sortBy !== sorter.field || this.state.sortDirection !== sortFlag) {
			this.setState({sortBy: sorter.field, sortDirection: sorter.order === "ascend" ? '+' : "-" }, () => {
				this.queryList();
			});
		}
	}

	render() {
		const { data, loading } = this.state;
		const columns = [
			{
				title: '更新时间',
				dataIndex: 'gmt_create',
				sorter: true,
				width: '20%',
				key:'gmt_create',
				render: (row) => {
					return formatDateTime(row, 'yyyy-MM-dd hh:mm:ss')
				}
			},
			{
				title: '表空间',
				dataIndex: 'tablespace',
				width: '20%',
				key:'tablespace'
			},
			{
				title: '存储总数',
				dataIndex: 'total_space',
				key:'total_space',
			},
			{
				title: '使用',
				dataIndex: 'used_space',
				key:'used_space',
			},
			{
				title: '空闲',
				dataIndex: 'free_space',
				key:'free_space',
			},
			{
				title: '增量',
				dataIndex: 'diff_space',
				key:'diff_space',
			},
			{
				title: '均值',
				dataIndex: 'avg_space',
				key:'avg_space',
			},
			{
				title: '使用率',
				dataIndex: 'used_rate',
				key:'used_rate',
			},
			{
				title: '可用天数',
				dataIndex: 'used_days',
				key:'used_days',
			},
			{
				title: '历史数据',
				dataIndex: '',
			 	key:'history',
			render: (value, row, index) => {
				return <a>历史数据</a>
			}
			}
		];
		return <Fragment>
			<div className='page-header'>
				<div className='page-title'>表空间预警</div>
			</div>
			<div className='page-toolbar'>
				<SearchBox conditionNameList={this.state.conditionNameList} handleInput={this.setCondition}></SearchBox>
				<Button className='search-btn' type="primary" onClick={this.queryList}>搜索</Button>
			</div>
			<div>
				<Table
					columns={columns}
					dataSource={data}
					rowKey={(record, index) => index}
					pagination={{
						current: this.state.pageIndex,
						pageSize: this.state.pageSize,
						total: this.state.total
					}}
				 loading={loading}
				  onChange={this.handleTableChange}
				/>
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