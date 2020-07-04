import { post, get } from '../../utils/request'

export function modifyDepartmentInfo(params){
  return post('/administer/modifyDepartment', params)
}


export function deleteDepartment(params){
  return get('/administer/delDepartment', params)
}