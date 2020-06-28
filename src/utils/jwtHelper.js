import { Token } from "./jwt";
import './config'

export const getJwt = () => {
  return 'bearer ' + sessionStorage.getItem('myjwt');
};
export const getJwtUser = () => {

  if (!global.constants.userInfo) {
    let jwtInfo = sessionStorage.getItem('myjwt');
    if (jwtInfo !== "null" && jwtInfo !== null) {
      let decryToken = Token.decrypt(jwtInfo)
      // let s= decodeURIComponent(escape(window.atob(jwtInfo.split('.')[1])))
      // let user =  (JSON.parse(s1))
      if (decryToken.token) {
        let user = decryToken.data
        //console.log(user)
        let name = "";
        let role = "";
        let username = "";
        let departmentNo = "";
        let department = "";

        for (var item in user) {
          if ((item.search("/claims/name")) >= 0) {
            name = user[item];
          }
          if ((item.search("/claims/role")) >= 0) {
            role = user[item];
          }
          if ((item.search("userData")) >= 0) {
            let extraData = user[item].split(',');
            username = extraData[0];
            departmentNo = extraData[1];
            department = extraData[2];
          }
        }

        global.constants.userInfo= {
          "name": name,
          "role": role,
          "username": username,
          "department": department,
          "departmentNo": departmentNo
        };
      }
      else { return null; }
    }
    else {
      return null;
    }
  }
  return global.constants.userInfo;
};


export const removeJwt = () => {
  sessionStorage.removeItem("myjwt");
}