//该文件是对axios的二次封装
import axios from 'axios'
//引入querystring,用于转换请求的参数
import qs from 'querystring'
//引入antd
import {message} from 'antd'
//引入请求基本路径
import {BASE_URL} from '../config'
//引入NProgress,用于实现请求进度条效果
import NProgress from 'nprogress'
//引用NProgress的样式
import 'nprogress/nprogress.css'


axios.defaults.baseURL = BASE_URL


//使用axios的请求拦截器
axios.interceptors.request.use((config)=>{
    NProgress.start()
    
    //config是配置对象,里面包含着所有本次请求的必要信息,比如:请求方式\请求的地址
    const {method,data} = config
   
   if(method === 'post' && data instanceof Object){
       //如果是post请求,且请求体参数为json编码,比如:请求方式\请求的地址
        config.data = qs.stringify(data)
   }
   
    return config
})

//使用axios的响应拦截器
axios.interceptors.response.use(
    (response)=>{
        NProgress.done();
        //如果响应的状态码为2开头,axios认为响应就是成功的
        // console.log('成功-----响应拦截器');
        return response.data
    },
    (err)=>{
        //如果响应的状态码不是2开头,或者连接超时,axios认为响应就是失败的
        // console.log('失败---响应拦截器',err.message)
        message.error('请求失败,请联系管理员')
        // alert(error.message)
        return new Promise(()=>{})//这样写不会触发axios发请求请求失败的回调
    }

)
export default axios






































