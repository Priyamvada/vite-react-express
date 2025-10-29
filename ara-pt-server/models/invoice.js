'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.User, {
        foreignKey: 'created_by_id',
        as: 'created_by',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  }
  Invoice.init({
    customer_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    customer_fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoice_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM('USD', 'MYR', 'IND', 'IDR', 'THB'),
      allowNull: false,
      defaultValue: 'USD',
    },
    paid_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    paid_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'Invoices',
  });
  return Invoice;
};