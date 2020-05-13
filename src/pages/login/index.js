import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Input, Icon, Row, Button, message } from 'antd';
import {regExpConfig} from '@reg'
import {bindActionCreators} from 'redux';
import {login} from  '@pages/login/store/actionCreator';
import LoginApi from '@pages/login/http'
import './login.less';
const FormItem = Form.Item;
@Form.create({
	onFieldsChange(props, items) { },
})
class Login extends Component {
	constructor(props) {
		super(props);
	}
	//提交表单登录
	handleSubmit(e) {
		e.preventDefault()
		//校验表单校验通过后提交表单
   this.props.form.validateFields((err, value) => {
		  if(!err){
				LoginApi.login(value)
				.then((resp) => {
					this.props.actions.login(resp);
					if(this.props.result.message === '该用户还没有注册!'){
						message.info(this.props.result.message)
						return;
					}
					if(this.props.result.code === 400) {
						message.info(this.props.result.message)
						return;
					}
					localStorage.user= value.name;
					localStorage.lastLink ? this.props.history.push(`/${localStorage.lastLink}`) : this.props.history.push('/main')
				})
			}
	 })
	}

	render() {
		const { getFieldDecorator } = this.props.form
		return (<Col span={24} className='login__wrapper'>
			<Row className='login__form'>
				<Col className='login__main'>
					<Form style={{ 'width': '15vw' }} onSubmit={e => this.handleSubmit(e)}>
						<FormItem hasFeedback>
							{getFieldDecorator('name', {
								rules: [
									{
										required: true, min: 4, max: 10, message: '用户名为4-10个字符',
									},
								 { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' },
								],
							})(<Input addonBefore={<Icon type="user" />} placeholder="请输入用户名" type="text" />)}
						</FormItem>
						<FormItem hasFeedback>
							{getFieldDecorator('password', {
								rules: [
									{
										required: true, min: 6, max: 10, message: '用户名为4-10个字符',
									},
									{ pattern: regExpConfig.policePassword, message: '账号4-10位数字或字母组成' },
								],
							})(<Input addonBefore={<Icon type="lock" />} placeholder="请输入密码" type="password" />)}
						</FormItem>
						<FormItem>
							<Button type="primary" style={{width: '100%'}} htmlType="submit">登录</Button>
						</FormItem>
					</Form>
				</Col>
			</Row>
		</Col>)
	}
}

const mapStateToProps = (state) => ({
	result: state.getIn(['login', 'result']),
})
//mapDispatch异步操作触发action然后通过reducer来改变状态树的值
const mapDispatchToProps = (dispatch, ownerProps) => ({
  actions: bindActionCreators({
    login,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)