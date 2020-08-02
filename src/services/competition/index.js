import { get } from '../../utils/request'

//专家获取比赛列表
export function getCompetitionFullListByCurrentExpert(params){
  return get('/administer/getCompetitionFullListByCurrentExpert', params)
}



