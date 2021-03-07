// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: "hotmail",
//   auth: {
//     user: "dailyhabittracker@outlook.com",
//     pass: "March2021"
//   }
// });
// const mailingOptions = {
//   from: "dailyhabittracker@outlook.com",
//   to: emailInput.val().trim(),
//   subject: "Sending email with node.js!",
//   text: "It is that simple!"
// }

// transporter.sendMail(mailingOptions, (err, info) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("Sent: " + info.response);
// })



// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());


// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
