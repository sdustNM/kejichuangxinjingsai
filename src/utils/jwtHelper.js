export const getJwt = () => {
  return 'bearer ' + sessionStorage.getItem('example-jwt-jwt');
};
export const getJwtUser = () => {
  let jwtInfo= sessionStorage.getItem('example-jwt-jwt');
  if (jwtInfo)
  {
    let user =  (JSON.parse(decodeURIComponent(escape(window.atob(jwtInfo.split('.')[1])))))
    console.log(user);
    let name="";
    let role="";
  
    for (var item in user) {
      if ((item.search("/claims/name")) >= 0) {
        name = user[item];
      }
      if ((item.search("/claims/role")) >= 0) {
        role = user[item];
      }
    }
  
    return  {"name":name,"role":role};

  }
  else 
  {
    return null;
  }

};