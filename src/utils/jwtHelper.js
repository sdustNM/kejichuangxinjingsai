import { Token } from "./jwt";
import './config'

export const getJwt = () => {
  //console.log('bearer ' + sessionStorage.getItem('myjwt'))
  const myjwt = sessionStorage.getItem('myjwt')
  if(!myjwt || myjwt === "null" ) return null
  return 'bearer ' + sessionStorage.getItem('myjwt');
};
export const getJwtUser = () => {

    let jwtInfo = sessionStorage.getItem('myjwt');
    //console.log("read jwtInfo:",jwtInfo)
    if (jwtInfo !== "null" && jwtInfo !== null) {
      //console.log(jwtInfo)
      let decryToken = Token.decrypt(jwtInfo)
      // let s= decodeURIComponent(escape(window.atob(jwtInfo.split('.')[1])))
      // let user =  (JSON.parse(s1))
      if (decryToken.token) {
        let user = decryToken.data
       // console.log(user)
        let name = "";
        let role = "";
        let username = "";
        let departmentNo = "";
        let department = "";
        let roleList=[];

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
            if (extraData.length>3)
            {
             roleList=extraData[3].split('.');
            }
          }
        }

        return {
          "name": name,
          "role": role,
          "username": username,
          "department": department,
          "departmentNo": departmentNo,
          "roleList":roleList
        };
      }
      else { return null; }
    }
    else {
      return null;
    }
};


export const removeJwt = () => {
  sessionStorage.clear();
}