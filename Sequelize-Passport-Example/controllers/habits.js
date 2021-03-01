const express = require("express");

const router = express.Router();

// Import the model (habits.js) to use its database functions.
const habits = require("../models/habits.js");

// Create all our routes and set up logic within those routes where required.

router.get("/", (req, res) => {
  habits.all(data => {
    const hbsObject = {
      habits: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/habits", (req, res) => {
  habits.create(
    ["habit_name", "category_id"],
    [req.body.habit_name, req.body.category_id],
    result => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/habits/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  habits.update(
    {
      completed: req.body.completed
    },
    condition,
    result => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete("/api/habits/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  habits.delete(condition, result => {
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
