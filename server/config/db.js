import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URI } = process.env;

const sequelize = new Sequelize(
        DATABASE_URI,
        {
            dialect: 'postgres',
        });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection established successfully.");
    } catch (error) {
        console.log("Unable to connect to the database:", error);
    }
};

export { sequelize };

export default connectDB;