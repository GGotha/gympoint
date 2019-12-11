module.exports = (sequelize, DataTypes) => {
  const Matrículas = sequelize.define(
    "Matrículas",
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
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false
      }
    },
    {
      tableName: "matrículas"
    }
  );

  Matrículas.associate = models => {
    Matrículas.belongsTo(models.Students, { foreignKey: "student_id" });
    Matrículas.belongsTo(models.Planos, { foreignKey: "plan_id" });
  };

  return Matrículas;
};
