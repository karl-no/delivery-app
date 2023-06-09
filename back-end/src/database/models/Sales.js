module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales',{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    totalPrice: DataTypes.DECIMAL(10, 2),
    saleDate: { 
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: DataTypes.STRING,

  },
  {
    tableName: 'sales',
    underscored: true,
    timestamps: false,
  });
  
  Sales.associate = (models) => {
    Sales.belongsTo(models.User, { foreignKey: 'userId' });
    Sales.belongsTo(models.User, { foreignKey: 'sellerId' });
  };
  return Sales;
}
