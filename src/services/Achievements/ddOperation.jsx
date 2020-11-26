import { get, post } from '../../utils/request'

//删除字典 比赛
export function delDDCompetitionById(params){
  return get('/AchieveCompetition/delDDCompetitionById', params)
}
export function getDDCompetitionById(params){
    return get('/AchieveCompetition/getDDCompetitionById', params)
  }

 export function setDDCompetitionById(params){
    return post('/AchieveCompetition/setDDCompetitionById', params)
  }

  export function getTypeList(params){
    return get('/AchieveCompetition/getTypeList', params)
  }

  export function getDDCompetitionListByFuzzy(params){
    return get('/AchieveCompetition/getDDCompetitionListByFuzzy', params)
  }

  