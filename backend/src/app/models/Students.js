module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "Students",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      tableName: "students"
    }
  );

  return Students;
};
