import { get } from '../../utils/request'

export function getNeedReviewCount(){
  return get('/Dashboard/getNeedReviewCount')
}

export function getTj(params){
  return get('/Dashboard/getTj', params)
}