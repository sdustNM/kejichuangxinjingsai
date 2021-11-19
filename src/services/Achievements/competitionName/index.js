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
export function getNeedReviewList(params) {
  return get('/AchieveCommon/listNeedReviewRealCompetition', params)
}

//审核：/api/AchieveCommon/reviewRealCompetition
export function reviewRealCompetition(params) {
  return post('/AchieveCommon/reviewRealCompetition', params)
}

// 获取实际比赛名称列表 GET ​/api​/AchieveCompetition​/getDDCompetitionListByFuzzy
export function getRealNameList(params) {
  return get('/AchieveCompetition/getDDCompetitionListByFuzzy', params)
}
// 根据id获取单个实际比赛名称 GET ​/api​/AchieveCompetition​/getDDCompetitionById
export function getRealName(params) {
  return get('/AchieveCompetition/getDDCompetitionById', params)
}
// 增加或修改指定实际比赛 POST ​/api​/AchieveCompetition​/setDDCompetitionById
export function setRealName(params) {
  return post('/AchieveCompetition/setDDCompetitionById', params)
}
//  删除指定实际比赛  GET ​/api​/AchieveCompetition​/delDDCompetitionById
export function deleteRealName(params) {
  return get('/AchieveCompetition/delDDCompetitionById', params)
}

// 获取固定比赛名称列表 GET ​/api​/AchieveCompetition​/getDDBaseCompetitionListByFuzzy
export function getBaseNameList(params) {
  return get('/AchieveCompetition/getDDBaseCompetitionListByFuzzy', params)
}
// 根据id获取单个固定比赛名称 GET ​/api​/AchieveCompetition​/getDDBaseCompetitionById
export function getBaseName(params) {
  return get('/AchieveCompetition/getDDBaseCompetitionById', params)
}
// 增加或修改指定固定比赛 POST ​/api​/AchieveCompetition​/setDDBaseCompetitionById
export function setBaseName(params) {
  return post('/AchieveCompetition/setDDBaseCompetitionById', params)
}
//  删除指定固定比赛  GET ​/api​/AchieveCompetition​/delDDBaseCompetitionById
export function deleteBaseName(params) {
  return get('/AchieveCompetition/delDDBaseCompetitionById', params)
}

