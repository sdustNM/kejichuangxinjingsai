import { get, post } from '../../utils/request'

//用户登陆
export function login(params){
  return post('/login', params)
}

//切换用户角色
export function switchRole(params){
  return get('loginSSO_SwitchTo', params)
}