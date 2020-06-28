import { getJwtUser } from "./jwtHelper"

export const getRole = () => {
  return getJwtUser()===null?"":getJwtUser().role;
}

export const getDeptID = () => {
  return getJwtUser()===null?"":getJwtUser().departmentNo;
  
}

const roleNames=['管理员','专家','学生']
export const getRoleName=()=>{
  return roleNames[getRole()-1]
}

export const isStudent = () => {
  return getRoleName() === '学生'
}

export const isExpert = () => {
  return getRoleName() === '专家'
}

export const isAdminister = () => {
  return getRoleName() === "管理员"
}