import { get, del } from '../../utils/request'

export function getCompetitionFilesByComId(params){
  return get('/Appendix/getCompetitionFilesByComId', params)
}

export function deleteCompetitionFile(params){
  return del('/Appendix/deleteCompetitionFile', params)
}