 
import {get} from '../../utils/request'

 const  getDepartmentListRequest=()=>{
    setTimeout(() => {
      console.log("开始读取")
      return get('/administer/getDepartmentList')
    }, 2000);
    
  }
 
 export const loadDepartmentListAction= (dispatch)=>{
    const res=  getDepartmentListRequest();
    dispatch({
      type:'LOAD_POST',
      payload:res.data
    })
    console.log("派发完成")
  }
  
