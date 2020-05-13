import React, { Component, Fragment } from 'react';
import SearchBox from '@components/searchBox';
import { Button, Table } from 'antd';
import AlaramHttp from './http.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryList } from '@pages/user/store/actionCreator';
import { formatDateTime } from '@common/utils/utils';

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
				title: '编号',
				dataIndex: 'id',
				sorter: true,
				width: '20%',
			},
			{
				title: '名称',
				dataIndex: 'username',
				width: '20%',
			},
			{
				title: '邮箱',
				dataIndex: 'mail',
			},
			{
				title: '旺旺',
				dataIndex: 'ww'
			},
			{
				title: '手机',
				dataIndex: 'mobile'
			},
			{
				title: '角色',
				dataIndex: 'role'
			},
			{
				title: '管理员',
				dataIndex: 'super'
			},
			{
				title: '操作',
				key:'operate',
				render: (row) => {
          return (
						<Fragment>
							<a>编辑</a> | <a>修改密码</a>
						</Fragment>
					)
				}
			},
			{
				title: '所属角色',
				render: () => {
					return (
						<Fragment>
							<a>所属角色</a>
						</Fragment>
					)
				}
			},
			{
				title: '编辑时间',
				dataIndex: 'gmt_modified',
				render: (row) => {
					return formatDateTime(row, 'yyyy-MM-dd hh:mm:ss')
				}
			}
		];
		return <Fragment>
			<div className='page-header'>
				<div className='page-title'>用户管理</div>
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
	result: state.getIn(['user', 'result']),
})
//mapDispatch异步操作触发action然后通过reducer来改变状态树的值
const mapDispatchToProps = (dispatch, ownerProps) => ({
	actions: bindActionCreators({
		queryList,
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AlaramList)