const config = require("../auth.config");
const User = require("../models/userSchema");
const Role = require("../models/roleSchema");
const verify = require("./emailVerifyController");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
      username: req.body.username,
      user_email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      verified: false,
      user_fname: "",
      user_lname: "",
      uniqueString: verify.randString()
  });

  user.save((err, user) => {
      if (err) {
          res.status(500).send({ message: err });
          return;
      }

      if (req.body.roles) {
          Role.find(
              {
                  name: { $in: req.body.roles }
              },
              (err, roles) => {
                  if (err) {
                      res.status(500).send({ message: err });
                      return;
                  }

                  user.roles = roles.map(role => role._id);
                  user.save(err => {
                      if (err) {
                          res.status(500).send({ message: err });
                          return;
                      }
                      // Send the email verification
                      verify.sendEmail(req.body.email, user.uniqueString);

                      // Once everything is done, send a success message
                      res.status(200).send({ message: "User was registered successfully! Please check your email to verify your account." });
                  });
              }
          );
      } else {
          // If no roles are specified, just save the user and send the email
          verify.sendEmail(req.body.email, user.uniqueString);

          // Send a success message
          res.status(200).send({ message: "User was registered successfully! Please check your email to verify your account." });
      }
  });
};

exports.signin = (req, res) => {
    User.findOne({
      user_email: req.body.email
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
  
        if (!passwordIsValid){
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
  
        if(!user.verified){
          return res.status(401).send({
            accessToken: null,
            message: "Email not verified. Please check your inbox!"
          })
        }
  
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
  
        var authorities = [];
  
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          uid: user._id,
          username: user.username,
          email: user.user_email,
          roles: authorities,
          accessToken: token
        });
        console.log(user.username)
      });
  };
  
  
  
  