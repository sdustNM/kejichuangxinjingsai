import { get } from '../../utils/request'

//
export function getProjectOperationState(params){
  return get('/getProjectOperationState', params)
}

export function getCompetitionState(params){
  return get('/getCompetitionState', params)
}
//api/getCompetitionState
