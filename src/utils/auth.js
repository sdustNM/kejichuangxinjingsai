export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function isLogin() {
  if(localStorage.getItem('token')) {
    return true
  }
  return false
}

export function getRole() {
  return localStorage.getItem('role')
}

export function setRole(role) {
  localStorage.setItem('role', role)
}