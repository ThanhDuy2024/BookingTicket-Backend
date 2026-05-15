import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.config";
import { Admin } from "./Admin.model";

export const Categories = sequelize.define("categories", {
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
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active"
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

Admin.hasMany(Categories, {
  foreignKey: "createdBy",
  as: "createdCategories"
});

Categories.belongsTo(Admin, {
  foreignKey: "createdBy",
  as: "createdByAdmin"
});


Admin.hasMany(Categories, {
  foreignKey: "updatedBy",
  as: "updatedCategories"
});

Categories.belongsTo(Admin, {
  foreignKey: "updatedBy",
  as: "updatedByAdmin"
});