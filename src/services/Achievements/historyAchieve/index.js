import { get, download } from '../../../utils/request'
//#region 历史竞赛api

//获取历史竞赛列表
export function getCompetitionList(params) {
  return get('/AchieveFileCompetition/getCompetitionList', params)
}
//​获取历史竞赛成果
export function getCompetitionByID(params) {
  return get('/AchieveFileCompetition/getCompetitionByID', params)
}
//​删除历史竞赛成果
export function deleteCompetitionByID() {
  return get('/AchieveFileCompetition/deleteCompetitionByID')
}
//​获取历史竞赛批次 
export function getCompetitionBatchList(params) {
  return get('/AchieveFileCompetition/getBatchList', params)
}
//导出历史竞赛Excel
export function exportCompetition(params, filename) {
  return download('/AchieveFileCompetition/exportCompetition', params, filename)
}
//#endregion

//#region 历史论文api
//获取论文收录类型列表
export function getArticleDDInfo() {
  return get('/AchieveFileArticle/getArticleDDInfo')
}
//​获取历史论文列表 
export function getArticleList(params) {
  return get('/AchieveFileArticle/getArticleList', params)
}
//​​获取历史论文成果
export function getArticleByID(params) {
  return get('/AchieveFileArticle/getArticleByID', params)
}
//​删除历史论文成果
export function deleteArticleByID() {
  return get('/AchieveFileArticle/deleteArticleByID')
}
//​获取历史论文批次 
export function getArticleBatchList() {
  return get('/AchieveFileArticle/getBatchList')
}
//导出历史论文Excel
export function exportArticle(params, filename) {
  return download('/AchieveFileArticle/exportArticle', params, filename)
}
//#endregion

//#region 历史专利api
//获取历史专利列表
export function getPatentList(params) {
  return get('/AchieveFilePatent/getPatentList', params)
}
//​获取历史专利成果
export function getPatentByID(params) {
  return get('/AchieveFilePatent/getPatentByID', params)
}
//​获取历史专利批次 
export function getPatentBatchList(params) {
  return get('/AchieveFilePatent/getBatchList', params)
}
//​删除历史专利成果
export function deletePatentByID() {
  return get('/AchieveFilePatent/deletePatentByID')
}
//导出历史专利Excel
export function exportPatent(params, filename) {
  return download('/AchieveFilePatent/exportPatent', params, filename)
}
//#endregion