import { get, post } from '../../utils/request'

export function getCompetitionList(params) {
  return get('/administer/getCompetitionSimpleListByFuzzy', params)
}

export function getCompetitionByID(id) {
  return get('/administer/getCompetitionByID', { id })
}

export function setCompetition(competition) {
  return post('/administer/setCompetition', competition)
}

export function getExpertsInCompetition(params){
  return get('/administer/getExpertsInCompetition', params)
}

//为比赛添加评审专家
export function addExpertForCompetition(params){
  return post('/administer/addExpertForCompetition', params)
}
//为比赛移除评审专家
export function removeExpertFromCompetition(params){
  return post('/administer/removeExpertFromCompetition', params)
}

//获取各学院推荐人数
export function getDepartmentLimitInCompetition(params){
  return get('/administer/getDepartmentLimitInCompetition', params)
}

//设置各学院推荐人数
export function setDepartmentLimitInCompetition(params){
  return post('/administer/setDepartmentLimitInCompetition', params)
}




