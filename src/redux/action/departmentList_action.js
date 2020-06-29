 
import {get} from '../../utils/request'

 const  getDepartmentListRequest=()=>{
    return get('/administer/getDepartmentList')
  }
 
 export const loadDepartmentListAction= async (dispatch)=>{
    const res= await getDepartmentListRequest();
    dispatch({
      type:'LOAD_POST',
      payload:res.data
    })
    
  }
  
