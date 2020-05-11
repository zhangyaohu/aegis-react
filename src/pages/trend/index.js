import React, { Component, Fragment } from 'react';
import SearchBox from '@components/searchBox';
import { Button, Table } from 'antd';
import AlaramHttp from './http.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryList } from '@pages/alarm/store/actionCreator';

class AlaramList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectVal: 'service',
			searchStr: '',
			pageIndex: 1,
			pageSize: 10,
			sortDirection: '-',
			data: [],
			loading: false,
			sortBy: 'createDate',
			conditionNameList: [
				{
					name: '服务名称',
					value: 'service'
				},
				{
					name: '角色',
					value: 'role'
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
		debugger;
		this.setState({
			selectVal: selectVal,
			searchStr: searchStr
		})
	}

	componentDidMount() {
		this.queryList();
	}

	queryList = () => {
		this.setState({ loading: true });
		AlaramHttp.queryList(this.getCondition())
			.then((resp) => {
				this.props.actions.queryList(resp);
				this.setState({ loading: false, data: this.props.result.data });

			})
	}

	render() {
		const { data, loading } = this.state;
		const columns = [
			{
				title: '告警时间',
				dataIndex: 'name',
				sorter: true,
				render: name => `${name.first} ${name.last}`,
				width: '20%',
			},
			{
				title: '主机名称',
				dataIndex: 'gender',
				width: '20%',
			},
			{
				title: '服务名称',
				dataIndex: 'email',
			},
			{
				title: '告警信息',
			},
			{
				title: '类型'
			},
			{
				title: '子类型'
			},
			{
				title: '级别'
			},
			{
				title: '角色组'
			},
			{
				title: '负责人'
			}
		];
		return <Fragment>
			<div className='page-header'>
				<div className='page-title'>趋势图预警</div>
			</div>
			<div className='page-toolbar'>
				<SearchBox conditionNameList={this.state.conditionNameList} handleInput={this.setCondition}></SearchBox>
				<Button className='search-btn' type="primary" onClick={this.queryList}>搜索</Button>
			</div>
			<div>
				<Table
					columns={columns}
					rowKey={record => record.login.uuid}
					dataSource={data}
					pagination={{
						current: this.state.pageIndex,
						pageSize: this.state.pageSize
					}}
				 loading={loading}
				// onChange={this.handleTableChange}
				/>
			</div>
		</Fragment>
	}
}

const mapStateToProps = (state) => ({
	result: state.getIn(['alarm', 'result']),
})
//mapDispatch异步操作触发action然后通过reducer来改变状态树的值
const mapDispatchToProps = (dispatch, ownerProps) => ({
	actions: bindActionCreators({
		queryList,
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AlaramList)