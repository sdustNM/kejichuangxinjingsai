export const counterReducer=(state={count:1},action)=>{
    switch(action.type)
    {
      case 'COUNT_ADD':
        return {
          ...state,count:state.count+1
        }
        default:
          return state;
    }
    //return state;
  }
  