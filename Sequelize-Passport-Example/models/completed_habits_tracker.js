module.exports = function(sequelize, DataTypes) {
  const HabitsCompleted = sequelize.define(
    "completed_habits",
    {
      completedID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      habitSelectedID: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  return HabitsCompleted;
};
