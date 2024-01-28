const ROLES = require("../models/roleSchema");
const User = require("../models/userSchema");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
 
    app.get('/verify/:uniqueString', async(req, res) =>{
        const {uniqueString} = req.params;
        const user = User.findOne({uniqueString: uniqueString});
        if(user){
            user.verified = true;
            const filter = {uniqueString: uniqueString};
            const replacementDocument = {
                $set: {
                    verified: true,
                }
            };
            const result = await User.updateOne(filter, replacementDocument);
            res.redirect('/verified');
        }else{
            res.json('User not found');
        }
    });
  };
 





