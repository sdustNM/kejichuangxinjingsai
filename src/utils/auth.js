import { getJwtUser } from "./jwtHelper"

export const getRole = () => {
  return getJwtUser()===null?"":getJwtUser().role;
}

const roleNames=['管理员','专家','学生']
export const getRoleName=()=>{
  return roleNames[getRole()-1]
}

export const isStudent = () => {
  return getRole() === '学生'
}

export const isExpert = () => {
  return getRole() === '专家'
}

export const isAdminister = () => {
  console.log(getRole())
  return getRole() === "管理员"
}