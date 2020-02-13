import React, { Component } from 'react'
import {Form,Icon,Input,Button} from 'antd';
import axios from 'axios'
import logo from './img/logo.png'
import './css/login.less'
const {Item} = Form

class Login extends Component {
	//自定义验证密码
	passwordValidator = (rule,value,callback)=>{
		//value是用户的输入,当用户输入不合法的时候,要调用callback
		//callback何时调用?当用户输入不合法的时候
		if(!value){
			callback('密码必须有奥')
		}else if(value.length > 12){
			callback('密码必须小于12位')
		}else if(value.length < 4){
			callback('密码必须大雨等于4位')
		}else if(!(/^\w+$/).test(value)){
			callback('密码必须是英文\数字\下划线组成')
		}else{
			callback()
		}
	}
	//相应表单提交
	handleSubmit = (event) =>{
		//阻止表单提交的默认行为
		event.preventDefault()  
		//获取所有表单中用户的输入
		this.props.form.validateFields((err, values) => {
			if (!err) {
					  const {username,password} = values
					  //如果输入的用户名和密码均没问题，就发送请求
					  //console.log('发送了网络请求', values);
					  axios.post('http://localhost:3000/login',`username=${username}&password=${password}`).then(
						  (response)=>{console.log(response.data);},
						  (error)=>{console.log(error);}
					  )
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
					{/* 表单被提交的时候后出发 */}
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item>
							{/* 
								用户名/密码的的合法性要求
									1). 必须输入
									2). 必须大于等于4位
									3). 必须小于等于12位
									4). 必须是英文、数字或下划线组成
							*/}
							{/* getFieldDecorator('给要装饰的域起个名字',{rules:[{规则1},{{规则2}}]})(要装饰的内容) */}
							{
								getFieldDecorator('username', {
									rules: [
										{validator:this.passwordvalidator}
									]
								})(
									<Input
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="用户名"
									/>
								)
							}
						</Item>
						<Item>
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="密码"
							/>
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}

//Form.create()返回值依是一个函数，该函数接收一个组件，随后生成一个新组件，我们渲染那个新组件
//Form.create()返回的方法能够加工组件，生成的新组件多了一个特别重要的属性：form
export default Form.create()(Login);



