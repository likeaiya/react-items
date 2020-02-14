import React, { Component } from 'react'
import {Form,Icon,Input,Button, message} from 'antd';
import logo from './img/logo.png'
import './css/login.less'
import {reqLogin} from '../../api'
import {connect} from 'react-redux'
import {createSaveUserInfoAction} from '../../redux/actions/login'
import {Redirect} from 'react-router-dom'
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
			callback('密码必须是英文.数字.下划线组成')
		}else{
			callback()
		}
	}
	//响应表单提交
	handleSubmit = (event) =>{
		//阻止表单提交的默认行为
		event.preventDefault()  
		//获取所有表单中用户的输入
		this.props.form.validateFields(async(err, values) => {
			 //如果输入的用户名和密码均没问题，就发送请求
			if (!err) {
					  const {username,password} = values
					 
					  //console.log('发送了网络请求', values);
					 let result = await reqLogin(username,password)
					 const {status,data,msg} = result;
					 if(status === 0){
						message.success('登陆成功啦')
						//1.向redux中保存用户信息
						this.props.saveUserInfo(data)
						//2.

						//3.跳转到admin页面
						this.props.history.push('/admin')
						
					 }else{
						 message.warning(msg)
					 }
					 //   myAxios.post('http://localhost:3000/login',values).then(
					// 	  (response)=>{
					// 		  console.log('成功的回调',response.response);
					// 		  const {status} = response
					// 		  if(status === 0) alert('登陆成功')
					// 		  else alert('登录失败')
					// 		}
					//   )
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const {isLogin} = this.props.userInfo  
		if(isLogin) return <Redirect to = '/admin'/>
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
 

 export default connect(
	 (state)=>({userInfo:state.userInfo}),  //用于映射状态)
	 {saveUserInfo:createSaveUserInfoAction}   //用于映射操作状态的方法
 )(Form.create()(Login))

 

