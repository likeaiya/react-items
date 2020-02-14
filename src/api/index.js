//该文件用于保存所有发送ajax请求的昂发,即:项目中所有的ajax请求,都要在此文件中准备一个请求函数
import myAxios from './myAxios'

export const reqLogin = (username,password) => myAxios.post('/login',{username,password})
