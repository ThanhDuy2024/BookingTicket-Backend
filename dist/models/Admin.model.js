"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("../configs/database.config");
exports.Admin = database_config_1.sequelize.define("Admins", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "active"
    },
    roleId: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "abcd"
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    updatedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});
