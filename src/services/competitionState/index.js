import { get } from '../../utils/request'

//
export function getProjectOperationState(params){
  return get('/getProjectOperationState', params)
}

export function getCompetitionState(params){
  return get('/getCompetitionState', params)
}

//发布比赛
export function startCompetition(params){
  return get('/CompetitionOperation/startCompetition', params)
}

//学院公示
export function yuanNotice(params){
  return get('/CompetitionOperation/yuanNotice', params)
}

//学校公示，结束比赛
export function endCompetition(params){
  return get('/CompetitionOperation/endCompetition', params)
}

