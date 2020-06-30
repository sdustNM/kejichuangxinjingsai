 
import {get} from '../../utils/request'

 const  getDepartmentListRequest=()=>{
      return get('/administer/getDepartmentList')
   }
 
 export const loadDepartmentListAction= async (dispatch)=>{
    console.log("start get...");
    const res= await getDepartmentListRequest();
    console.log(res);
    dispatch({
      type:'LOAD_POST',
      payload:res
    })
    console.log("派发完成")
  }
  
