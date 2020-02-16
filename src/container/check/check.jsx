//check组件是一个高阶组件:1.接收一个组件. 2.返回一个新组件
//chenck组件能够对传入的组件,进行权限检查
//比如:未登录,不能看admin:登陆了,不能看login

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export default function (ReceiveComponent){
    @connect(
        (state)=>({isLogin:state.userInfo.isLogin}),//映射状态
        {} //映射操作状态的方法
    )
    class NewComponent extends Component{
        //检查规则


        render(){
            const {isLogin} = this.props
            const {pathname} = this.props.location
            if (!isLogin && pathname === '/admin') {
                return <Redirect to="/login"/>
            }
            if (isLogin && pathname === '/login') {
                return <Redirect to="/admin"/>
            }
            return <ReceiveComponent {...this.props}/>
        }
    }
    return NewComponent
}



