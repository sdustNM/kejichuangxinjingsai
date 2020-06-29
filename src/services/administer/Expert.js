import { get } from '../../utils/request'

export function getExpertFuzzy(params){
  return get('/administer/getExpertFuzzy')
}