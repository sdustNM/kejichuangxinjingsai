import React from 'react';
import ReactDOM from 'react-dom';

// redux 使用举例
import store from  './store'
import {get} from '../utils/request'

 const  getDepartmentListRequest=()=>{
      return get('/administer/getDepartmentList')
   }
 
  
  const   getDepartmentList = async  () => {
   
    store.dispatch({
      type: 'LOAD_Department',
      payload: []
    })  

  console.log("start get...");
  const res = await  getDepartmentListRequest()
  if (res)
  {
  store.dispatch({
      type: 'LOAD_Department',
      payload: res.data.data
    })
  }
  let t=store.getState().departmentList.list;
  return  Promise.resolve(t)

} 

export default getDepartmentList;