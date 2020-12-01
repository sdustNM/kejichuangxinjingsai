import { get, post } from '../../utils/request'

/////////////////////////公共部分////////////////////////////////
//删除附件
export function deleteAchievementFile(params){
  return get('/AchieveCommon/deleteAchievementFile', params)
}

//获取成果列表
export function getNeedReviewList(params){
  return get('/AchieveCommon/getNeedReviewList', params)
}
//学院评审
export function setDepartmentReview(params){
  return post('/AchieveCommon/setDepartmentReview', params)
}
//学校评审
export function setSchoolReview(params){
  return post('/AchieveCommon/setSchoolReview', params)
}

///////////////////////////论文部分//////////////////////////////

//获取论文列表
export function getArticleList(params){
  return get('/AchieveArticle/getArticleList', params)
}
//​获取论文成果
export function getArticleByID(params){
  return get('/AchieveArticle/getArticleByID', params)
}
//设置论文成果
export function setArticleByID(params){
  return post('/AchieveArticle/setArticleByID', params)
}
//​删除论文成果
export function deleteArticleByID(params){
  return get('/AchieveArticle/deleteArticleByID', params)
}

///////////////////////////专利部分//////////////////////////////

//获取专利列表
export function getPatentList(params){
  return get('/AchievePatent/getPatentList', params)
}
//​获取专利成果
export function getPatentByID(params){
  return get('/AchievePatent/getPatentByID', params)
}
//设置专利成果
export function setPatentByID(params){
  return post('/AchievePatent/setPatentByID', params)
}
//​删除专利成果
export function deletePatentByID(params){
  return get('/AchievePatent/deletePatentByID', params)
}

///////////////////////////竞赛部分//////////////////////////////
//获取竞赛列表
export function getCompetitionList(params){
  return get('/AchieveCompetition/getCompetitionList', params)
}
//​获取竞赛成果
export function getCompetitionByID(params){
  return get('/AchieveCompetition/getCompetitionByID', params)
}
//设置竞赛成果
export function setCompetitionByID(params){
  return post('/AchieveCompetition/setCompetitionByID', params)
}
//​删除竞赛成果
export function deleteCompetitionByID(params){
  return get('/AchieveCompetition/deleteCompetitionByID', params)
}
//a获取竞赛成果表单中的下拉选项
export function getDDInfo(params){
  return get('/AchieveCompetition/getDDInfo', params)
}
export function getTypeList(params){
  return get('/AchieveCompetition/getTypeList', params)
}
