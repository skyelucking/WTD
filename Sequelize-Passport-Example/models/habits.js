// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const habits = {
  all: function(cb) {
    orm.all("habits", res => {
      cb(res);
    });
  },

  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("habits", cols, vals, res => {
      cb(res);
    });
  },

  update: function(objColVals, condition, cb) {
    orm.update("habits", objColVals, condition, res => {
      cb(res);
    });
  },

  delete: function(condition, cb) {
    orm.delete("habits", condition, res => {
      cb(res);
    });
  }
};

module.exports = habits;
