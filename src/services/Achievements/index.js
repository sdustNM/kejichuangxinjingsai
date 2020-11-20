import { get, post } from '../../utils/request'

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