//进行axios二次封装：使用请求与响应拦截器
import axios from 'axios';
import { error } from 'console';
import { ElMessage } from 'element-plus';
//第一步：利用axios对象的create方法，去创建axios实例(配置基础路径，超时时间)
const request= axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,//基础路径携带/api
    timeout:5000 //超时时间
});

// 第二步：添加请求拦截器
request.interceptors.request.use((config)=>{
    return config
})

// 第二步：添加响应拦截器
request.interceptors.response.use((response)=>{

    // 简化数据
    return response.data
},(error)=>{
    //失败回调，处理http网络错误
    let message =''
    let status =error.response.status
    switch(status){
        case 401:
            message = 'TOKEN过期';
            break;
        case 403:
            message = '无权访问';
            break;
        case 404:
            message = '请求地址错误';
            break;
        case 500:
            message = '服务器出现错误';
            break;
        default:
            message = '网络出现错误';
            break;
    }
    // 提示错误信息
    ElMessage({
        type:'error',
        message
    })

    return Promise.reject(error);
})

// 对外暴露
export default request;

