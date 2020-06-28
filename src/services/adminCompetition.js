import { get, post } from '../utils/request'

export function getCompetitionList(params) {
  return get('/administer/getCompetitionSimpleListByDepartment', params)
}

export function getCompetitionByID(id) {
  return get('/administer/getCompetitionByID', { id })
}

export function setCompetition(competition) {
  return post('/administer/setCompetition', competition)
}


