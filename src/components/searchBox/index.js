import React, { Component, Fragment } from 'react';
import { Select, Input, Col } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select;
class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchStr: '',
			selectVal: this.props.conditionNameList[0].value
		}
	}

	handleInput = (e) => {
		this.setState({
			searchStr: e.target.defaultValue
		}, () => {
			this.props.handleInput(this.state.searchStr, this.state.selectVal);
		})
	}

	handleSelect = (e) => {
		this.setState({
			selectVal: e
		}, () => {
			this.props.handleInput(this.state.searchStr, e);
		})
	}

	render() {
		return <Fragment>
			<Col span={2}>
				<Select
					showSearch
					style={{ width: '100%' }}
					placeholder="请输入搜索条件"
					defaultValue={this.props.conditionNameList[0].value}
					value={this.state.selectVal}
					onChange={this.handleSelect}
					suffixIcon={<CaretDownOutlined />}
				>
					{
						this.props.conditionNameList.map((item, index) => {
							return <Option value={item.value} key={index}>{item.name}</Option>
						})
					}
				</Select>
			</Col>
			<Col span={3}>
				<Input placeholder='请输入搜索内容' style={{
					'display': 'inline-block', 'marginLeft': '-2px',
					'borderRadius': '0px 3px 3px 0px'
				}} onChange={this.handleInput} onBlur={this.handleInput} />
			</Col>
		</Fragment>
	}
}

export default SearchBox;