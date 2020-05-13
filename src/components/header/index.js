import React, { Component, Fragment } from 'react';
import './header.less';
import { Drawer, Menu, Form, Input, Button } from 'antd';
import logo from '@images/logo.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { regExpConfig } from '@reg'
import { getMenuList } from '@components/leftNav/store/actionCreator';
import UserApi from '@pages/user/http';
import { alarmList, oracleList, configList } from '@components/leftNav/menuList.js';

const FormItem = Form.Item;
@Form.create({
	onFieldsChange(props, items) { },
})
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKey: '',
			visible: false
		}
	}
	//登出
	layout = () => {
		this.props.history.push('/login');
	}
	//切换一级菜单左侧菜单变化
	handleClick = (e) => {
		switch (e.key) {
			case 'alarm':
				localStorage.namespace = 'alarm';
				this.props.history.push('/main/alarm-list');
				localStorage.lastLink = 'main/alarm-list'
				this.props.actions.getMenuList(alarmList);
				break;
			case 'oracle':
				localStorage.namespace = 'oracle';
				this.props.history.push('/main/trend-metric');
				localStorage.lastLink = 'main/trend-metric'
				this.props.actions.getMenuList(oracleList);
				break;
			case 'config':
				localStorage.namespace = 'config';
				this.props.history.push('/main/user-manager');
				localStorage.lastLink = 'main/user-manager'
				this.props.actions.getMenuList(configList);
				break;
			default:
				localStorage.namespace = 'alarm';
				this.props.history.push('/main/alarm-list');
				localStorage.lastLink = 'main/alarm-list'
				this.props.actions.getMenuList(alarmList);
		}
		this.setState(() => {
			return {
				selectedKey: e.key
			}
		})
	}

	handleClose = () => {
		this.setState({
			visible: false
		})
	}

	handleModifyPsw = () => {
		this.setState({
			visible: true
		})
	}

	componentDidMount() {
		debugger;
		if (localStorage.namespace) {
			switch (localStorage.namespace) {
				case 'alarm':
					localStorage.lastLink ? this.props.history.push(`/${localStorage.lastLink}`) : this.props.history.push(`/main/alarm-list`);
					this.props.actions.getMenuList(alarmList);
					break;
				case 'oracle':
					localStorage.lastLink ? this.props.history.push(`/${localStorage.lastLink}`) : this.props.history.push(`/main/oracle`);
					this.props.actions.getMenuList(oracleList);
					break;
				case 'config':
					localStorage.lastLink ? this.props.history.push(`/${localStorage.lastLink}`) : this.props.history.push(`/main/user`);
					this.props.actions.getMenuList(configList);
					break;
				default:
					localStorage.lastLink ? this.props.history.push(`/${localStorage.lastLink}`) : this.props.history.push(`/mian/alarm-list`);
					this.props.actions.getMenuList(alarmList);
			}
		} else {
			localStorage.lastLink ? this.props.history.push(`/${localStorage.lastLink}`) : this.props.history.push(`/`);
			this.props.actions.getMenuList(alarmList);
		}
		this.setState(() => {
			return {
				selectedKey: localStorage.namespace ? localStorage.namespace : 'alarm'
			}
		})
	}

	handleSubmit = (e) => {
			//提交表单登录
		e.preventDefault()
		//校验表单校验通过后提交表单
   this.props.form.validateFields((err, value) => {
		  if(!err){
				UserApi.modifyPwd({password: value.password})
				.then((resp) => {
			    this.handleClose();
				})
			}
	 })
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const layout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		return (<header className='header'>
			<span className='header-logo'>
				<img src={logo} />
			</span>
			<span className='header-content'>
				<Menu onClick={this.handleClick}
					mode="horizontal"
					theme="dark"
					selectedKeys={[this.state.selectedKey]}
					style={{ 'display': 'inline-block', 'height': '60px', 'lineHeight': '60px' }}>
					<Menu.Item key="alarm">
						告警
				   	</Menu.Item>
					<Menu.Item key="oracle">
						Oracle
					  </Menu.Item>
					<Menu.Item key="config">
						配置
					  </Menu.Item>
				</Menu>
				<span className="header__layout">
					<span className="header__layout__image"></span>
					<ul className="header__layout_item__content">
						<li>{localStorage.user ? localStorage.user : ''}</li>
						<li onClick={this.handleModifyPsw}>修改密码</li>
						<li onClick={this.layout}>退出登录</li>
					</ul>
				</span>
				<Drawer
					title="修改密码"
					placement="right"
					closable={'body'}
					onClose={this.handleClose}
					visible={this.state.visible}
					getContainer={'body'}
				>
					<Form {...layout} onSubmit={e => this.handleSubmit(e)}>
						<FormItem label='新密码:'>
							{
								getFieldDecorator('password', {
									rules: [
										{
											required: true, min: 6, max: 10, message: '用户名为6-10个字符',
										},
										{ pattern: regExpConfig.policePassword, message: '账号6-10位数字或字母组成' },
									],
								})(<Input type='password' placeholder='请输入密码' />)
							}
						</FormItem>
						<FormItem label='确认密码:'>
							{
								getFieldDecorator('newPassword', {
									rules: [
										{
											required: true, min: 6, max: 10, message: '用户名为6-10个字符',
										},
										{ pattern: regExpConfig.policePassword, message: '账号6-10位数字或字母组成' },
									],
								})(<Input type='password' placeholder='请输入确认密码' />)
							}
						</FormItem>
						<div style={{'textAlign': 'center',  'width': '100%'}}>
							<Button type="primary" htmlType="submit" style={{'marginRight': '10px'}}>确认</Button>
							<Button type="default" onClick={this.handleClose}>取消</Button>
						</div>
					</Form>
				</Drawer>
			</span>
		</header>)
	}
}
const mapStateToProps = () => {
	return ({

	})
}
const mapDispatchToProps = (dispatch, ownerProps) => ({
	actions: bindActionCreators({
		getMenuList,
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);