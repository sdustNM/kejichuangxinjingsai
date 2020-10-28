import { get } from '../../utils/request'

export function loginSSOAccess(params){
  return get('/loginSSOAccess', params)
}
