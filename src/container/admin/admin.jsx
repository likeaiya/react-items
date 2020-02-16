import React, { Component } from 'react'
import check from '../check/check'
import { Layout } from 'antd';
import './admin.less'
import Header from '../header/header'
const { Footer, Sider, Content } = Layout;

@check
class Admin extends Component {

	render() {
		return (
			
			<Layout className='layout'>
				<Sider>Sider</Sider>
				<Layout>
				<Header /> 
				<Content style={{backgroundColor:'skyblue'}}>Content</Content>
				<Content>Content</Content>
				<Footer>Footer</Footer>
				</Layout>
		  </Layout>
		
		)
	}
}

// export default connect(
// 	(state)=>({userInfo:state.userInfo}), //映射状态
// 	{deleteUserInfo:createDeleteUserInfoAction} //映射操作状态的方法
// )(Admin)

export default Admin

