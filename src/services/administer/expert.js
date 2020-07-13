import { post,get } from '../../utils/request'

export function getExpertsByFuzzy(params){
  return post('/administer/getExpertsByFuzzy', params)
}

export function addExpert(params){
  return post('/administer/addExpert', params)
}

export function modifyExpert(params){
  return post('/administer/modifyExpert', params)
}

export function getExpertById(params){
  return get('/administer/getExpertById', params)
}