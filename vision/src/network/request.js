// axios配置
import axios from 'axios'



export function request(config){
    const instance = axios.create({
        baseURL:'http://127.0.0.1:3000/api/',
        timeout: 5000
    })

    // 请求拦截器
    instance.interceptors.request.use(config=>{

        return config
    },err=>{})

    // 响应拦截器
    instance.interceptors.response.use(config=>{

        return config
    },err=>{})

    return instance(config)
}
