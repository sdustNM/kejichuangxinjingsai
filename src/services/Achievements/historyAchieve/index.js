import { get } from '../../../utils/request'

//获取历史竞赛列表
export function getCompetitionList(params){
  return get('/AchieveFileCompetition/getCompetitionList', params)
}
//​获取历史竞赛成果
export function getCompetitionByID(params){
  return get('/AchieveFileCompetition/getCompetitionByID', params)
}

//​获取历史论文列表 
export function getArticleList(params){
  return get('/AchieveFileArticle/getArticleList', params)
}
//​​获取历史论文成果
export function getArticleByID(params){
  return get('/AchieveFileArticle/getArticleByID', params)
}

//获取历史专利列表
export function getPatentList(params){
  return get('/AchieveFilePatent/getPatentList', params)
}
//​获取历史专利成果
export function getPatentByID(params){
  return get('/AchieveFilePatent/getPatentByID', params)
}