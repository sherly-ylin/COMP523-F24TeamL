const express = require("express"); // CommonJS import style!
const router = express.Router();
const User = require("../models/userSchema");


router.post('/', async (req, res) => {
    const email = req.body.email;
    const user = User.findOne({ user_email: email });
    if (user) {
        const filter = { user_email: email };
        const replacementDocument = {
            $set: {
                user_fame: req.body.firstName,
                user_lname: req.body.lastName,
            }
        }
        const result = await User.updateOne(filter, replacementDocument);
        res.json({message: "Successfully updated info"});
    } else {
        res.json('User not found');
    }


})


module.exports = router;



