 
import {get} from '../../utils/request'

 const  getDepartmentListRequest=()=>{
    return get('http://jsonplaceholder.typicode.com/posts')
  }
 
 export const loadDepartmentListAction= async (dispatch)=>{
    const res= await getDepartmentListRequest();
    dispatch({
      type:'LOAD_POST',
      payload:res.data
    })
    
  }
  
