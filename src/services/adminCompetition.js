import { get, post } from '../utils/request'

export function getCompetitionList(id) {
  return get('/administer/queryCompetitionSimpleListByDepartment', { id })
}

export function getCompetitionByID(id) {
  return get('/administer/queryCompetitionByID', { id })
}

export function modifyCompetition(competition) {
  return post('/administer/modifyCompetition', competition)
}


