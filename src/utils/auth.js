import { getJwtUser } from "./jwtHelper"

export const getRole = () => {
  return getJwtUser() === null ? "" : getJwtUser().role;
}

export const getRoleList = () => {
  return getJwtUser() === null ? "" : getJwtUser().roleList;
}

export const getUserID = () => {
  return getJwtUser() === null ? "" : getJwtUser().name
}

export const getDeptID = () => {
  return getJwtUser() === null ? "" : getJwtUser().departmentNo
}

const roleNames = ['管理员', '专家', '学生', '校级管理员']
export const getRoleName = id => {
  let roleID = id ? id : getRole();
  if (roleID == 1 && getDeptID() == 0) return roleNames[3]
  else return roleNames[roleID - 1]    //1
}

export const isStudent = () => {
  return getRoleName() === '学生'    //3
}

export const isExpert = () => {
  return getRoleName() === '专家'   //2
}

export const isAdminister = () => {
  return getRoleName() === "管理员"
}

export const isSuperAdminister = () => {
  return getRoleName() === "校级管理员"
}

export const getPage = (jsonwebtoken, history) => {
  sessionStorage.setItem('myjwt', jsonwebtoken);
  console.log(getJwtUser())
  if (isStudent()) {
    history.push('/student')
  } else if (isExpert()) {
    history.push('/Expert')
  } else {
    history.push('/administer')
  }
}