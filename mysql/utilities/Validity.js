const jwt = require("jsonwebtoken");
require('dotenv').config()


const isEmailValid = function (email) {



	const validationRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);

	if (!validationRegex.test(email)) {
		return false;
	}
	return true;

};

const checkToken= (key)=>{
    return (req, res, next) => {
      let token = req.get("authorization");
      if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        // console.log(token)
        jwt.verify(token,key , (err, decoded) => {
          if (err) {
            return res.json({
              success: 0,
              message: "Invalid Token..."
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        return res.json({
          success: 0,
          message: "Access Denied! Unauthorized User"
        });
      }
    }
  }

  module.exports = {checkToken,isEmailValid}