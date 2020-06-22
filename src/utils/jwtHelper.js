export const getJwt = () => {
  return 'bearer ' + sessionStorage.getItem('myjwt');
};
export const getJwtUser = () => {
  let jwtInfo= sessionStorage.getItem('myjwt');
  if (jwtInfo!=="null")
  {
    let user =  (JSON.parse(decodeURIComponent(escape(window.atob(jwtInfo.split('.')[1])))))
    let name="";
    let role="";
    let username="";
    let departmentNo="";
    let department="";
  
    for (var item in user) {
      if ((item.search("/claims/name")) >= 0) {
        name = user[item];
      }
      if ((item.search("/claims/role")) >= 0) {
        role = user[item];
      }
      if ((item.search("userData"))>=0){
        let extraData=user[item].split(',');
        username=extraData[0];
        departmentNo=extraData[1];
        department=extraData[2];
      }
    }
  
    return {
      "name": name,
      "role": role,
      "username": username,
      "department": department,
      "departmentNo": departmentNo
    };

  }
  else 
  {
    return null;
  }

};


export const removeJwt=()=>{
  sessionStorage.removeItem("myjwt");
}