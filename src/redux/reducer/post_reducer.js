export const postReducer =  (state = { list: [{ title: '你好!' }] }, action)=> {
    switch (action.type) {
      case 'LOAD_POST':
        return {
          ...state, list: action.payload
        }
      default: return state;
    }
  }