const { decodeToken } = require("../utils/token");
const cookieparser = require('cookieparser')

const authMiddleware = async (req, res, next) => {
  try {
    const currentPath = req.path;
    let excluded = false;
    // if its an excluded path, get out of the middelware!

    // const details = decodeToken(req.headers.authorization);

    if(!req.headers.cookie){
      console.log('please login')
      return res.send("You must login first!!!");
    }
    
    const parsed = cookieparser.parse(req.headers.cookie)
    console.log(parsed);

    if(!parsed.auth){
      console.log('please login')
      return res.send("You must login first!!!");
    }
    
    console.log('____________________________')
    auth = JSON.parse(parsed.auth)
    
    console.log(auth);
    
    const details = decodeToken(auth.token);

    if(details.userId != auth.userId){        //cheking if the token is tempered
      return res.send("bruh, send me the right token?");
    }

    req.user = details;
    req.user.username = auth.username;
    req.user.fullname = auth.fullname;  
      //   fullname : user.fullname,
      //   id : user._id,
      //   token : token
    console.log(details)

    next();
  } catch (e) {
    console.log("error: ", e);
    return res.status(400).send("bruh, send me the right token?");
  }
 
  

};

module.exports = authMiddleware;
