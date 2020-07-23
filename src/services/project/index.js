import { get, post, del } from '../../utils/request'

//根据 比赛ID、学号、专家ID 获取参赛项目列表，支持分页,不带附件信息
export function getSimpleProjectList(params){
  return get('/administer/getSimpleProjectList', params)
}

//根据 比赛ID、学号、专家ID 获取参赛项目列表，支持分页,不带附件信息
export function getSimpleProjectListForExpert(params){
  return get('/administer/getSimpleProjectListForExpert', params)
}

//根据项目ID获取参赛项目内容
export function getProjectInfoByID(params){
  return get('/administer/getProjectInfoByID', params)
}
//添加或修改项目内容(id=0，表示添加)
export function setProjectInfo(params){
  return post('/administer/setProjectInfo', params)
}

//获取项目附件
export function getProjectFilesByProjectId(params){
  return get('/Appendix/getProjectFilesByProjectId', params)
}
//删除项目附件
export function deleteProjectFile(params){
  return get('/Appendix/deleteProjectFile', params)
}

export function getFullProjectList(params){
  return get('/administer/getFullProjectList', params)
}