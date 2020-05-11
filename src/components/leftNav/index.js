import React, { Component, Fragment } from 'react';
import { Menu, Button } from 'antd';
import {
	DownSquareOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
} from '@ant-design/icons';
import './nav.less';
const SubMenu = Menu.SubMenu;
class LeftNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			openKeys: []
		}
	}
  //设置菜单
	getMenu = (menuList) => {
		return menuList.map((item, index) => {
			if (item.children.length === 0 && item.type === 'link') {
				return (<Menu.Item key={item.path}>
					{
						item.title
					}
				</Menu.Item>)
			} else if (item.children.length > 0 && item.type === 'button') {
				return (<SubMenu key={item.path} title={item.title}>
					  {this.getMenu(item.children)}
				</SubMenu>)
			}
		})
	}
	//监听路由变化
	componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.openKeys(nextProps.location.pathname)
    }
	}
	//打开二级菜单触发操作
	onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }
	
	//已挂载
  componentDidMount() {
    this.init()
	}
	//初始化打开子菜单
	init = () => {
    this.openKeys(this.props.location.pathname)
    const menu  = this.props.menuList;
    const arr = []
    menu.map((item, index) => {
			//当path路径中存在$$时表示存在子菜单
			if(item.path.indexOf('$$')>=0)
      arr.push(item.path)
    })
    this.setState({ rootSubmenuKeys: arr })
	}
	
 // 菜单点击事件
 _handleClick = (e) => {
	this.props.history.push(`/${e.key}`)
	localStorage.lastLink = e.key;
}

// 确认当前要打开的菜单
openKeys = (pathname) => {
	/*
	**计算要打开的以及菜单
	*/
	const menu  = this.props.menuList
	const curPath = `${pathname.replace('/', '')}`
  const openKeys = [];
	// 定义一个标签语句
	// eslint-disable-next-line
	for (let i = 0; i < menu.length; i += 1) {
		const item = menu[i]
		if (item.path && curPath === item.path) {
			// eslint-disable-next-line
			openKeys.push(item.path);
		} else if (item.children && item.children.length > 0) {
			// eslint-disable-next-line
			for (let j = 0; j < item.children.length; j += 1) {
				const record = item.children[j]
				if (record.path && curPath === record.path) {
					// eslint-disable-next-line
					openKeys.push(item.path);
				}
			}
		}
	}
	this.setState({
		openKeys: openKeys,
	})
}

// 左侧菜单高亮的控制
leftMenuHighLight = () => {
	const { pathname } = this.props.location
	// console.log(pathname)
	let selectedKeys = [pathname.replace('/', '')]
	return selectedKeys
}

	render() {
		const {openKeys} = this.state;
		return (
			<nav className='nav'>
				<Menu
					mode="inline"
					onClick={this._handleClick}
					inlineIndent="16"
					openKeys={openKeys}
					onOpenChange={this.onOpenChange}
					selectedKeys={this.leftMenuHighLight()}
					style={{height: '100%'}}
				>
					{this.getMenu(this.props.menuList)}
				</Menu>
			</nav>
		)
	}
}

export default LeftNav;