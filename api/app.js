const cors = require('cors');
const express = require('express');

const db = require('../api/database');
const Role = db.roles;
const routes = require("./routes/index");
const {config} = require("dotenv");

/* Creating an express app on port 8080 */
const app = express();
const port = 3000;

/* Initalizing cors */
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

/* Allowing express to use jsons */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Connecting to MongoDB database through mongoose */
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Initialize database
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }


        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

initial();

/* Connecting to routers */
app.use('/', routes);
//require("./routes/getUserInfoRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/verifyEmailRoutes")(app);
require("./routes/authRoutes")(app);

const getUserInfo = require("./routes/getUserInfoRoutes");
app.use("/userInfo", getUserInfo);

const setUserInfo = require("./routes/setUserInfoRoutes");
app.use("/user-setting", setUserInfo);

const getCurrentUser = require("./routes/getCurrentUserRoutes");
app.use("/current-user", getCurrentUser);

/* Show the app started */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

module.exports = app;
