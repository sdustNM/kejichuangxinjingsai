import axios from 'axios'
import { getJwt } from './jwtHelper'

const instance = axios.create({
  baseURL: 'http://192.168.34.201:4000/api',
  timeout: 5000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['authorization'] = getJwt();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export function get(url, params) {
  return instance.get(url, {
    params
  })
}

export function post(url, data){
  return instance.post(url, data)
}

export function put(url, data){
  return instance.put(url, data)
}

export function del(url){
  return instance.delete(url)
}