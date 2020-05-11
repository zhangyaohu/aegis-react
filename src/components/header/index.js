import React, { Component } from 'react';
import './header.less';
import { Col, Row, Tabs, Menu } from 'antd';
import logo from '@images/logo.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMenuList } from '@components/leftNav/store/actionCreator';
import { alarmList, oracleList, configList } from '@components/leftNav/menuList.js';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state={
			selectedKey: ''
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
				this.props.actions.getMenuList(alarmList);
				break;
			case 'oracle':
				localStorage.namespace = 'oracle';
				this.props.history.push('/main/oracle');
				this.props.actions.getMenuList(oracleList);
				break;
			case 'config':
				localStorage.namespace = 'config';
				this.props.history.push('/main/user');
				this.props.actions.getMenuList(configList);
				break;
			default:
				localStorage.namespace = 'alarm';
				this.props.history.push('/main/alarm-list');
				this.props.actions.getMenuList(alarmList);
		}
		this.setState(() => {
			return {
			  selectedKey: e.key
		  }
		})
	}

	componentDidMount() {
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

	render() {
		return (<header className='header'>
			<Row>
				<Col span={3}>
					<img src={logo} />
				</Col>
				<Col span={21}>
					<Menu onClick={this.handleClick} 
								mode="horizontal"
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
							<li></li>
							<li>修改密码</li>
							<li onClick={this.layout}>退出登录</li>
						</ul>
					</span>
				</Col>
			</Row>
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