import { get } from '../../utils/request'

export function getAllManByFuzzy(params){
  return get('/administer/getAllManByFuzzy', params)
}
