import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {rootReducers} from './reducer/index'



const store=createStore(
    rootReducers,
    compose(
      applyMiddleware(...[thunk]),  //需要使用的中间件数组
    )
    );
  
export default store;


//使用说明
//(1)  在action和reducer中分别添加派发事件和影响方法
//(2)  在index中将新的对象加入rootReducers中
//(3)  在需要使用的地方引入 store.js和相应的action。  
//(4)  访问时，调用 store.getState(), 写值时用 store.dispatch(action的名字) ，例如： index.js中注释部分
//参考视频： https://www.bilibili.com/video/BV1Kt411k7Xz