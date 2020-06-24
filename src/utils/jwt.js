const jwt = require('jsonwebtoken');
export const Token = {
  encrypt:function(data,time){ //data加密数据，time过期时间
    return jwt.sign(data, 'token', {expiresIn:time})
  },
  decrypt:function(token){
    try {
      let data = jwt.verify(token, '123456789987654321s');
      return {
        token:true,
        id:data.id,
        data:data
      };
    } catch (e) {
      return {
        token:false,
        data:e
      }
    }
  }
}
