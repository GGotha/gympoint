module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define(
    "Files",
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      path: DataTypes.STRING
    },
    {
      tableName: "files"
    }
  );

  return Files;
};
