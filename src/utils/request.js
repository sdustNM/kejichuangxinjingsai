import axios from 'axios'
import { getJwt } from './jwtHelper'

export const appRoot = 'http://192.168.34.201:4000'
//export const appRoot = 'http://localhost:5000'
export const baseURL = `${appRoot}/api`


const instance = axios.create({
  baseURL: baseURL,
  timeout: 60000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  config.headers['authorization'] = getJwt();
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //return response;
  if (response.data.hasOwnProperty('result') && !response.data.result) {
    if (response.data.message=="请先登录")
    {
        window.location.href="/";
    }
    alert('请求数据出错：' + response.data.message)
    return new Promise(() => { })
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  //return Promise.reject(error);
  alert('服务器响应请求出错：' + error.message)
  return new Promise(() => { })
});

export function get(url, params) {
  return instance.get(url, { params })
}

export function post(url, data) {
  return instance.post(url, data)
}

export function put(url, data) {
  return instance.put(url, data)
}

export function del(url, params) {
  return instance.delete(url, { params })
}


