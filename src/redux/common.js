
// redux 使用举例
import store from  './store'
import {get} from '../utils/request'

 const  getDepartmentListRequest=()=>{
      return get('/administer/getDepartmentList')
   }
 
  
const getDepartmentList = async () => {

  console.log(store.getState())
  if (!store.getState().departmentList || !store.getState().departmentList.list || store.getState().departmentList.list.length == 0) {
    console.log("start get...");
    const res = await getDepartmentListRequest()
    if (res) {
      store.dispatch({
        type: 'LOAD_Department',
        payload: res.data.data
      })
    }
  }
  let t = store.getState().departmentList.list;
  return Promise.resolve(t)
} 

export default getDepartmentList;