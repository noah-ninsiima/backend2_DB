const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken =(req,res, next)=>{
  let headers = req.headers
  if(headers.authorization){
    if (headers.authorization.startsWith("Bearer")){
      let token =headers.authorization.split(" ")[1]
      //validate
        jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
          if(error){
            //if invalid, we send an error msg
            res.send("invalid Token provided")
          }else{
              //console.log(decoded)
              req.userEmail =decoded.email
              req.userId =decoded.userId
               next()
            }
          })

        }else{
      res.send("Auth header is malformed; Missing (Bearer)")
    }
    
  }else {
    res.send("Request missing authorization header with token")
  }
  //res.send("request reveived")
 
}

module.exports = verifyToken;