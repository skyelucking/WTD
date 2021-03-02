module.exports = function(sequelize, DataTypes) {
  const HabitsSelected = sequelize.define(
    "habits_selected",
    {
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
      categoryID: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  HabitsSelected.associate = models => {
    HabitsSelected.hasMany(models.completed_habits, {
      foreignKey: "userID",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    HabitsSelected.belongsTo(models.User, { foreignKey: "userID" });
  };

  return HabitsSelected;
};
