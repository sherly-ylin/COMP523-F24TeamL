const express = require("express"); 
const router = express.Router();
const User = require("../models/userSchema");
const { authJwt } = require("../middlewares/authJwt");
const jwt = require("jsonwebtoken");
const config = require("../auth.config");


router.get("/", (req, res) => {
  // console.log(req.headers.authorization)
  const usertoken = req.headers.authorization;
  const token = usertoken.split(" ");
  //   console.log(token);
  const decoded = jwt.verify(token[1], config.secret);
  var userId = decoded.id;
  User.find({ _id: userId }, (err, result) => {
    if (err) {
      // console.log('Here!')
      console.error(err);
      return;
    } else {
      // console.log("here!!!")
      // console.log(result)
      if (result.length > 0) {
        const info = new Object();
        info.username = result[0].username;
        info.firstName = result[0].user_fame;
        info.lastName = result[0].user_lname;
        info.email = result[0].user_email;
        res.json(info);
      }
    }
  });
});


module.exports = router;





