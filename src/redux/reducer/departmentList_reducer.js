export const departmentListReducer =  (state = { list: [] }, action)=> {
    switch (action.type) {
      case 'LOAD_Department':
        return {
          ...state, list: action.payload
        }
      default: return state;
    }
  }