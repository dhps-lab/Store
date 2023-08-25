'use strict';

/** @type {import('sequelize-cli').Migration} */

const { USER_TABLE } = require('./../models/user.model');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { CATEGORY_TABLE } = require('../models/category.model');
const { PRODUCT_TABLE } = require('../models/product.model');
const { ORDER_TABLE } = require('../models/order.model');
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'customer'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
  });

  await queryInterface.createTable(CUSTOMER_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      field: 'last_name',
    },
    phone: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    },
    userId: {
      allowNull: false,
      field: 'user_id',
      type: Sequelize.DataTypes.INTEGER,
      unique: true,
      references: {
        model: USER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  });
  await queryInterface.createTable(CATEGORY_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      unique: true,
      type: Sequelize.DataTypes.STRING
    },
    image: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    }
  });
  await queryInterface.createTable(PRODUCT_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER
    },
    image: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: Sequelize.DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    },
    categoryId: {
      allowNull: false,
      field: 'category_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: CATEGORY_TABLE,

        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  });
  await queryInterface.createTable(ORDER_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    customerId: {
      allowNull: false,
      field: 'customer_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: CUSTOMER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    }
  });
  await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
    },
    amount: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER
    },
    orderId: {
      allowNull: false,
      field: 'order_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: ORDER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    productId: {
      allowNull: false,
      field: 'product_id',
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
