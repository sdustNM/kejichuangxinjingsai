import { get } from '../utils/request'

export function getExpertList(params) {
  return get('/administer/getExpertsByFuzzyV2', params)
}

// export function getCompetitionByID(id) {
//   return get('/administer/getCompetitionByID', { id })
// }

// export function setCompetition(competition) {
//   return post('/administer/setCompetition', competition)
// }


