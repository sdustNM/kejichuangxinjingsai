import { get, post } from '../../utils/request'

//删除新闻封面图片附件
export function deleteImageFile(params){
  return get('/News​/deleteImageFile', params)
}

//获取新闻列表
export function getNewsList(params){
  return get('/News/getNewsList', params)
}

// /api/News/setNewsInfo
export function setNewsInfo(params){
  return post('/News/setNewsInfo', params)
}
// /api/News/getNewsInfoByID
export function getNewsInfoByID(params){
  return get('/News/getNewsInfoByID', params)
}