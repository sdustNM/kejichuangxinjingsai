import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'
import getDepartmentList from './redux/common'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store from './redux/store';
import {persistor} from './redux/store';

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
//     console.log('last');
//     console.log(store);
//     console.log(store.getState())

//获取部门列表:
//import getDepartmentList from './redux/common'
getDepartmentList().then(res => {
    if (res.length !== 0) {
        console.log(res)
    }
})


ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <ConfigProvider locale={zhCN} >
     
          <App />
       
  </ConfigProvider>
  </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
