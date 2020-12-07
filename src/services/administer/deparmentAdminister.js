import { get } from '../../utils/request'


// 全部
export function getDepartmentAdministerList(params){
  return get('/administer/getDepartmentAdministerList', params)
}

//单个部门下的管理员
export function getDepartmentAdministersById(params){
  return get('/administer/getDepartmentAdministersById', params)
}

//删除某个管理员
export function removeDepartmentAdminister(params){
  return get('/administer/removeDepartmentAdminister', params)
}

export function addDepartmentAdminister(params){
  return get('/administer/addDepartmentAdminister', params)
}

//模糊匹配教师信息 searchTxt
export function getExpertsByFuzzyV2(params){
  return get('/administer/getExpertsByFuzzyV2', params)
}

//模糊匹配所有人信息 searchTxt
export function getAllManByFuzzy(params){
  return get('/administer/getAllManByFuzzy', params)
}

export function getStudentsByFuzzy(params) {
  return get('/administer/getStudentsByFuzzy', params)
}



