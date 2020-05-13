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
					name: '实例',
					value: 'service'
				}
			]
		}
	}
  //构造请求条件
	getCondition() {
		return {
			[this.state.selectVal]: this.state.searchStr,
			start: (this.state.pageIndex - 1) * this.state.pageSize,
			limit: this.state.pageSize,
			sort: `${this.state.sortDirection}${this.state.sortBy}`
		}
	}
  //设置请求条件
	setCondition = (searchStr, selectVal) => {
		this.setState({
			selectVal: selectVal,
			searchStr: searchStr
		})
	}
  //发起请求
	componentDidMount() {
		this.queryList();
	}
  //查询列表
	queryList = () => {
		this.setState({ loading: true }, () => {
			tableSpaceHttp.queryList(this.getCondition())
			.then((resp) => {
				this.props.actions.queryList(resp);
				//更新数据
				this.setState({ loading: false, data: this.props.result.data, total: this.props.result.total });
			})
		});
	}

	handleTableChange = (pagination, filters, sorter) => {
		//分页操作
		if(this.state.pageIndex !== pagination.current || this.state.pageSize !== pagination.pageSize)
		this.setState({pageIndex: pagination.current, pageSize: pagination.pageSize }, () => {
			this.queryList();
		});
		debugger
		//排序操作
		let sortFlag = sorter.order === "ascend" ? '+' : "-"
		if(this.state.sortBy !== sorter.field || this.state.sortDirection !== sortFlag) {
			this.setState({sortBy: sorter.field, sortDirection: sorter.order === "ascend" ? '+' : "-" }, () => {
				this.queryList();
			});
		}
	}

	showTotal = (total) => {
		return `共 ${total} 条`;
	}

	render() {
		const { data, loading } = this.state;
		//数据表头等属性
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
				title: '实例名',
				dataIndex: 'service',
				width: '20%',
				key:'service'
			},
			{
				title: '创建者',
				dataIndex: 'owner',
				key:'owner',
			},
			{
				title: '段名',
				dataIndex: 'segmeng_name',
				key:'segmeng_name',
			},
			{
				title: '分区名',
				dataIndex: 'partition_name',
				key:'partition_name',
			},
			{
				title: '使用(MB)',
				dataIndex: 'used_space',
				key:'used_space',
			},
			{
				title: '最后DDL时间(%)',
				dataIndex: 'last_ddl_time',
				key:'last_ddl_time',
				render: (row) => {
					return formatDateTime(row, 'yyyy-MM-dd hh:mm:ss')
				}
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
				<div className='page-title'>段空间预警</div>
			</div>
			<div className='page-toolbar'>
				{/*搜索组件*/}
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
						total: this.state.total,
						showTotal:this.showTotal,
						showSizeChanger: true,
						showQuickJumper: true
					}}
				 loading={loading}
				  onChange={this.handleTableChange}
				/>
			</div>
		</Fragment>
	}
}
//获得数据请求结果
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