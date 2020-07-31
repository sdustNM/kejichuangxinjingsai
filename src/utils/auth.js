import { getJwtUser } from "./jwtHelper"

export const getRole = () => {
  return getJwtUser() === null ? "" : getJwtUser().role;
}

export const getUserID = () => {
  return getJwtUser() === null ? "" : getJwtUser().name
}

export const getDeptID = () => {
  return getJwtUser() === null ? "" : getJwtUser().departmentNo
}

const roleNames = ['管理员', '专家', '学生', '校级管理员']
export const getRoleName = () => {
  let roleID = getRole();
  if (roleID == 1 && getDeptID() == 0) return roleNames[3]
  else return roleNames[getRole() - 1]
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

export const isSuperAdminister = () => {
  return getRoleName() === "校级管理员"
}