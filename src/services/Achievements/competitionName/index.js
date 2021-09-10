import { get, post } from '../../../utils/request'

//学生端查询实际比赛名称 /api/AchieveCommon/queryRealCompetitionByName
export function queryRealCompetitionByName(params) {
  return get('/AchieveCommon/queryRealCompetitionByName', params)
}

//学生端提交实际比赛名称 /api/AchieveCommon/setRealCompetition
export function setRealCompetition(params) {
  return post('/AchieveCommon/setRealCompetition', params)
}

//列举所有需要审核的实际比赛 /api/AchieveCommon/listNeedReviewRealCompetition
export function getNeedReviewList(){
  return get('/AchieveCommon/listNeedReviewRealCompetition')
}

//审核：/api/AchieveCommon/reviewRealCompetition
export function reviewRealCompetition(params) {
  return post('/AchieveCommon/reviewRealCompetition', params)
}

