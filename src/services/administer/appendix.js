import { get } from '../../utils/request'

export function getCompetitionFilesByComId(params){
  return get('/Appendix/getCompetitionFilesByComId', params)
}

export function deleteCompetitionFile(params){
  return get('/Appendix/deleteCompetitionFile', params)
}