import { get, post } from '../../utils/request'

//根据项目id,获取学院和学校推荐及评审结果
export function getReviewResult(params) {
  return get('/ProjectRecommend/getReviewResult', params)
}

//获取待推荐学院作品列表
export function getRecommendedProjectList_yuan(params) {
  return get('/ProjectRecommend/getRecommendedProjectList_yuan', params)
}

//学院推荐项目
export function setProjectRecommend_yuan(params) {
  return post('/ProjectRecommend/setProjectRecommend_yuan', params)
}

//学院取消推荐项目
export function cancelProjectRecommend_yuan(params) {
  return post('/ProjectRecommend/cancelProjectRecommend_yuan', params)
}

//推荐确认，学院推荐完成后，点击确认， 公示比赛结束， 状态进入1.4
export function confirmRecommend(params) {
  return post('/ProjectRecommend/RecommendConfirm', params)
}

//获取待推荐学校作品列表
export function getRecommendedProjectList_xiao(params) {
  return get('/ProjectRecommend/getRecommendedProjectList_xiao', params)
}

//getResultLevels
export function getResultLevels() {
  return get('/ProjectRecommend/getResultLevels')
}

//学校评审项目/api/ProjectRecommend/setProjectResult_xiao
export function setProjectResult_xiao(params) {
  return post('/ProjectRecommend/setProjectResult_xiao', params)
}

