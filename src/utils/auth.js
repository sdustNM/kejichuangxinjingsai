const getRole = () => {
  return '1'
}

export const isStudent = () => {
  return getRole() === '3'
}

export const isExpert = () => {
  return getRole() === '2'
}

export const isAdminister = () => {
  return getRole() === '1'
}