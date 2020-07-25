import { get } from '../../utils/request'

//专家获取比赛列表
export function getCompetitionFullListByCurrentExpert(params){
  return get('/administer/getCompetitionFullListByCurrentExpert', params)
}


export function getCompetitionState(params)
{
  return get('/getCompetitionState', params)
}


export function startCompetition(params){
  return get('/CompetitionOperation/startCompetition', params)
}