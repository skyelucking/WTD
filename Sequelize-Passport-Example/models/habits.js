module.exports = function(sequelize, DataTypes) {
  const HabitsSelected = sequelize.define("habits_selecteds", {
    habitID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    habitName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cateogyID: {
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
