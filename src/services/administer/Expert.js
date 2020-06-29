import { post } from '../../utils/request'

export function getExpertFuzzy(params){
  return post('/administer/getExpertsByFuzzy', params)
}