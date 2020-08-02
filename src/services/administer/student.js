import { post,get } from '../../utils/request'

export function ImportStudentFromRemote(){
  return post('/DBOperation/ImportStudentFromRemote', null)
}

export function getStudentsByFuzzy(params){
    return get('/Student/getStudentsByFuzzy', params)
  }
  
  