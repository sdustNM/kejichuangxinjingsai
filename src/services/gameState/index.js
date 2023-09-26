import { get } from '../../utils/request'

//查询系统填报状态
export function getGameState(params){
  return get('/AchieveCommon/requireGameState', params)
}

//开启填报
export function startGame(params){
  return get('/AchieveCommon/startGame', params)
}

//关闭填报
export function stopGame(params){
  return get('/AchieveCommon/stopGame', params)
}