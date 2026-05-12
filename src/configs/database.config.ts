import { Sequelize } from "sequelize"
import chalk from "chalk"
export const sequelize = new Sequelize(String(process.env.database_url), {
    dialect: "postgres",

    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },

    logging: false
})

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      alter: true
    })
    console.log(chalk.green("Database is connected!"))
  } catch (error) {
    console.log(error);
    console.log(chalk.red("Database is not connected!"));
  }
}