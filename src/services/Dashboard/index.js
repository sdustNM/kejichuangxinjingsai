import { get } from '../../utils/request'

export function getNeedReviewCount(){
  return get('/Dashboard/getNeedReviewCount')
}

export function getTj(){
  return get('/Dashboard/getTj')
}