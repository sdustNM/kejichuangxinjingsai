import { get, post } from '../../../utils/request'

//获取批次列表 /api/ArchieveBatch/getBatchList
export function getBatchList(params){
  return get('/AchieveBatch/getBatchList', params)
}
//​获取批次信息
export function getBatchByID(params){
  return get('/AchieveBatch/getBatchByID', params)
}
//设置批次信息
export function setBatchByID(params){
  return post('/AchieveBatch/setBatchByID', params)
}
//​删除指定批次
export function deleteBatchByID(params){
  return get('/AchieveBatch/deleteBatchByID', params)
}

//指定当前批次
export function setCurrentBatch(params){
  return get('/AchieveBatch/setCurrentBatch', params)
}
