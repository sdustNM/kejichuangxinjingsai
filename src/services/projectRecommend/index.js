import { get, post } from '../../utils/request'

//获取待推荐学院作品列表
export function getRecommendedProjectList_yuan(params){
  return get('/ProjectRecommend/getRecommendedProjectList_yuan', params)
}

//学院推荐项目
export function setProjectRecommend_yuan(params){
  return post('/ProjectRecommend/setProjectRecommend_yuan', params)
}

//学院取消推荐项目
export function cancelProjectRecommend_yuan(params){
  return post('/ProjectRecommend/cancelProjectRecommend_yuan', params)
}

//获取待推荐学校作品列表
export function getRecommendedProjectList_xiao(params){
  return get('/ProjectRecommend/getRecommendedProjectList_xiao', params)
}

//学校推荐项目
export function setProjectRecommend_xiao(params){
  return post('/ProjectRecommend/setProjectRecommend_xiao', params)
}

//学校取消推荐项目
export function cancelProjectRecommend_xiao(params){
  return post('/ProjectRecommend/cancelProjectRecommend_xiao', params)
}
