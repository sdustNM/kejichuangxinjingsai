 
import {get} from 'axios'

 const  getPostsRequest=()=>{
    return get('http://jsonplaceholder.typicode.com/posts')
  }
 
 export const loadPostsAction= async (dispatch)=>{
    const res= await getPostsRequest();
    dispatch({
      type:'LOAD_POST',
      payload:res.data
    })
    
  }
  
