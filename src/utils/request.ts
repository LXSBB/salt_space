import axios from 'axios';
import { showMessage } from "./status";   // 引入状态码文件
import {ElMessage, ElNotification} from 'element-plus'  // 引入el 提示框，这个项目里用什么组件库这里引什么

// 设置接口超时时间
axios.defaults.timeout = 5000;

// @ts-ignore
axios.defaults.baseURL = '/api';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // 配置请求头
        config.headers = {
            //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
            'Content-Type':'application/json;charset=UTF-8',        // 传参方式json
            'token': localStorage.getItem('user_salt') || ''              // 这里自定义配置，这里传的是token
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        // if (response.data) response.data = eval('(' + response.data + ')')
        // console.log('werqw',JSON.parse(response.data) )
        return response.data;
    },
    error => {
        const {response} = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            ElNotification({
                offset: 70,
                title: 'Error',
                message: showMessage(response.status),
                type: 'error',
            })
            return Promise.reject(response.data);
        } else {
            ElNotification({
                offset: 70,
                title: 'Warning',
                message: '网络连接异常,请稍后再试!',
                type: 'warning',
            })
            return Promise.reject('error');
        }
    }
);

// 封装 GET POST 请求并导出
export function request(url='',params={},type='POST',cb: any=null){
//设置 url params type 的默认值
    return new Promise((resolve,reject)=>{
        let promise :any
        if( type.toUpperCase() ==='GET' ){
            promise = axios({
                url,
                params
            })
        } else if ( type.toUpperCase() === 'POST' ){
            promise = axios({
                method:'POST',
                url,
                data:params
            })
        } else if ( type.toUpperCase() === 'upload' ) {
            promise = axios({
                method:'POST',
                url,
                timeout: 60000,
                headers:{
                    'Content-Type':'multipart/form-data;charset=UTF-8',
                },
                onUploadProgress: function (progressEvent) {
                    //上传进度百分比
                    let percentage = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    cb(percentage)
                },
                data:params
            })
        }
        //处理返回
        promise.then((res:object)=>{
            resolve(res)
        }).catch((err:object)=>{
            reject(err)
        })
    })
}