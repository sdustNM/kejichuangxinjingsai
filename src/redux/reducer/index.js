import {counterReducer} from './counter_reducer'
import{ postReducer} from './post_reducer'
import {combineReducers} from 'redux'

export  const rootReducers=combineReducers({
    counter:counterReducer,
    post:postReducer,
  })