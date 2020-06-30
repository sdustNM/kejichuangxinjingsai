import { post } from '../../utils/request'

export function getExpertsByFuzzy(params){
  return post('/administer/getExpertsByFuzzy', params)
}