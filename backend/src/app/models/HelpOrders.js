module.exports = (sequelize, DataTypes) => {
  const HelpOrders = sequelize.define(
    "HelpOrders",
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
      question: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      answer_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: "help_orders"
    }
  );

  HelpOrders.associate = models => {
    HelpOrders.belongsTo(models.Students, { foreignKey: "student_id" });
  };

  return HelpOrders;
};
