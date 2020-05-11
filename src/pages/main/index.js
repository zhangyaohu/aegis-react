import React, { Component, Fragment } from 'react';
import Header from '@components/header';
import LeftNav from '@components/leftNav';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './main.less';

class Main extends Component {
	constructor (props) {
		super (props)
	}

	render () {
		return (<ConfigProvider locale={zhCN}>
			<Header {...this.props}></Header>
			<div className='main-container'>
		 	  <LeftNav  menuList={this.props.menuList} {...this.props}></LeftNav>
		  	<div className='main-container'>
			    <div className='main-content'>
					  {this.props.children}
					</div>
			  </div>
			</div>
		</ConfigProvider>)
	}
}

const mapStateToProps = (state) => {
	return {
		menuList:JSON.parse(JSON.stringify(state.getIn(['menu', 'menuList']))),
	}
}
export default connect(mapStateToProps)(Main);