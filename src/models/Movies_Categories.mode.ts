import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.config";

export const Movies_Categories = sequelize.define(
  "Movies_Categories",
  {
    movieId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);