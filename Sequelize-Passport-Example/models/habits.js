module.exports = function(sequelize, DataTypes) {
  const Habits = sequelize.define("habits", {
    category: DataTypes.STRING
  });

  // Habits.associate = function(models) {
  //   Habits.belongsto(models.User, {
  //     onDelete: "cascade"
  //   });
  // };

  return Habits;
};
