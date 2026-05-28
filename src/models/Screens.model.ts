import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.config";
import { Admin } from "./Admin.model";

export const Screens = sequelize.define("screens", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  createdBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Admins",
      key: "id"
    }
  },

  updatedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Admins",
      key: "id"
    }
  }

}, {
  timestamps: true,
})

Screens.belongsTo(Admin, {
  foreignKey: "createdBy",
  as: "creator"
});

Screens.belongsTo(Admin, {
  foreignKey: "updatedBy",
  as: "updator"
});