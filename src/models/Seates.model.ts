import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.config";
import { Admin } from "./Admin.model";
import { Screens } from "./Screens.model";

export const Seats = sequelize.define("seats", {
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

  screenId: {
    type: DataTypes.UUID,
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
  timestamps: true
})

Seats.belongsTo(Admin, {
  foreignKey: "createdBy",
  as: "creator"
});

Seats.belongsTo(Admin, {
  foreignKey: "updatedBy",
  as: "updator"
});

Seats.belongsTo(Screens, {
  foreignKey: "screenId",
  as: "screen"
})

Screens.hasMany(Seats, {
  foreignKey: "screenId",
  as: "seats"
})