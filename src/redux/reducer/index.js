import {counterReducer} from './counter_reducer'
import{ postReducer} from './post_reducer'
import {combineReducers} from 'redux'
import {departmentListReducer} from './departmentList_reducer'

export  const rootReducers=combineReducers({
    counter:counterReducer,
    post:postReducer,
    departmentList:departmentListReducer,
  })