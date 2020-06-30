import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'

// redux 使用举例
//import store from  './redux/store'
// import {counterAddAction} from './redux/action/counter_action'
// import { loadPostsAction} from './redux/action/post_action';
//import { loadDepartmentListAction} from './redux/action/departmentList_action';

// console.log(store);
// console.log(store.getState())

// store.dispatch(counterAddAction);
// store.dispatch(loadPostsAction)
// store.dispatch(loadDepartmentListAction);

// setTimeout(() => {
// console.log(store);
// console.log(store.getState())
// }, 1000);


ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
