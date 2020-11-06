import axios from 'axios'
import { getJwt } from './jwtHelper'

export const appRoot = 'http://192.168.34.201:4000'
//export const appRoot = 'http://localhost:5000'
export const baseURL = `${appRoot}/api`


const instance = axios.create({
  baseURL: baseURL,
  timeout: 60000
})

//采用H5 sessionStorage，保存登录信息的公共js，不采用jquery
 var _EXPIRE_TIME = 20*60*1000;//20分钟没有操作，则注销
 var _interval_handler=-1;

 function checkExpired() {
  //console.log("心跳检查是否过期"+window.location.href+"::"+new Date());
  var storeLastTime=sessionStorage.getItem("nxgx_lastVisitTime")?sessionStorage.getItem("nxgx_lastVisitTime"):-1;
  if (storeLastTime==-1) {
     clearInterval(_interval_handler);
     _interval_handler=-1;
  }
  else {
       if ((new Date()).getTime()-storeLastTime>_EXPIRE_TIME) {  //过期了
         
         alert("由于您长时间未进行操作，系统已为您自动退出登录");
         //删除sessionStorage信息
         sessionStorage.clear();
         //把页头中的已登录部分，改为需要登录的样子
         document.location.reload();//刷新当前页面
         //退出循环
         clearInterval(_interval_handler);
         _interval_handler=-1;
    }
 }
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  //console.log(config)
  if(config.url !== '/login'){
    const jwt = getJwt()
    if(jwt) {
      config.headers['authorization'] = getJwt();

      if (getJwt()!=null) {//已登录
        //刷新最后使用时间
        //console.log("visit:"+new Date().getTime())
        sessionStorage.setItem("nxgx_lastVisitTime", new Date().getTime());
        if (_interval_handler==-1)
        {
           _interval_handler=setInterval(checkExpired, 10*1000);//10秒钟检查一次，是否超时
        }
        else {
           //console.log("have create interval_timer")
        }
       }
    }
    else{
      let url = '/login'
      if(window.localStorage.isSSO === 'true') {
        url = '/loginSSO'
      }
      window.location.href = url
      return new Promise(() => { })
    }
  
  }
  //config.headers['Access-Control-Allow-Origin'] = '*';
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
    if (response.data.message === "请先登录") {
      window.location.href = "/";
    }
    alert('请求错误：' + response.data.message)
    return new Promise(() => { })
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  //return Promise.reject(error);
  console.log(error)
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


