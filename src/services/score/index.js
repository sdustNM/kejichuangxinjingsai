import { get, post } from '../../utils/request'

//获取项目分数
export function getProjectScore(params){
  return get('/ProjectScore/getProjectScore', params)
}

//设置项目分数
export function setProjectScore(params){
  return post('/ProjectScore/setProjectScore', params)
}
