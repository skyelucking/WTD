module.exports = function(sequelize, DataTypes) {
  const HabitsSelected = sequelize.define("habits_selected", {
    habitName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return HabitsSelected;
};
