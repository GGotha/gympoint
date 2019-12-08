module.exports = (sequelize, DataTypes) => {
  const Planos = sequelize.define(
    "Planos",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false
      }
    },
    {
      tableName: "planos"
    }
  );

  return Planos;
};
