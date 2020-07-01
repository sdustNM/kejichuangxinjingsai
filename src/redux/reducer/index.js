import {counterReducer} from './counter_reducer'
import{ postReducer} from './post_reducer'
import {combineReducers} from 'redux'
import {departmentListReducer} from './departmentList_reducer'
import { persistReducer} from 'redux-persist';
//  存储机制，可换成其他机制，当前使用sessionStorage机制
import storageSession from 'redux-persist/lib/storage/session'
// import storage from 'redux-persist/lib/storage'; //localStorage机制
//import { AsyncStorage } from 'react-native'; //react-native

const storageConfig = {
  key: 'root', // 必须有的
  storage:storageSession, // 缓存机制
  blacklist: [] // reducer 里不持久化的数据,除此外均为持久化数据
  //  whitelist: ['name','age'] // reducer 里持久化的数据,除此外均为不持久化数据
}



 const rootReducers=combineReducers({
    counter:counterReducer,
    post:postReducer,
    departmentList:departmentListReducer,
  })

 const myPersistReducer=persistReducer(storageConfig,rootReducers);
  
export default myPersistReducer;