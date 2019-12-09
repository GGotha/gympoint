module.exports = (sequelize, DataTypes) => {
  const Checkins = sequelize.define(
    "Checkins",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "checkins"
    }
  );

  Checkins.associate = models => {
    Checkins.belongsTo(models.Students, { foreignKey: "student_id" });
  };

  return Checkins;
};
