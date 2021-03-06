// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. 
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      fName: req.body.fName,
      lName: req.body.lName
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
        fName: req.user.fName
      });
    }
  });
  // Route to get all the habits in the database
  app.get("/api/all/", function (req, res) {
    db.habits_selected.findAll({}).then(function(habit) {
      res.json(habit);
    });
  });

  // Route to create habits to send to database
  app.post("/api/add_habit", (req, res) => {
    console.log(req.body);
    db.habits_selected
      .create({
        habitID: req.body.habitID,
        habitName: req.body.habitName,
        categoryID: req.body.categoryID,
        userID: req.body.userID, 
        Monday: req.body.Monday, 
        Tuesday: req.body.Tuesday, 
        Wednesday: req.body.Wednesday, 
        Thursday: req.body.Thursday, 
        Friday: req.body.Friday, 
        Saturday: req.body.Saturday, 
        Sunday: req.body.Sunday, 
      })
      .then(() => {
        res.send(200);
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.delete("/api/delete_habit", (req, res) => {
    console.log(req.body);
    db.habits_selected
      .destroy({
        where: {habitID: req.body.habitID},
        })
      .then(() => {
        
        res.send(200);
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  
}; // end of export 
