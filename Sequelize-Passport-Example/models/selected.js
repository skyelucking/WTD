module.exports = function(sequelize, DataTypes) {
  const selectedHabits = sequelize.define("habits_selected", {
    habitName: DataTypes.STRING,
    cateogyID: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN
  });

  // selectedHabits.associate = function(models) {
  //   selectedHabits.belongsto(models.User, {
  //     onDelete: "cascade"
  //   });
  // };

  return selectedHabits;
};
