import { get } from '../../utils/request'

//获取项目分数
export function loginSSOAccess(params){
  return get('/loginSSOAccess', params)
}
