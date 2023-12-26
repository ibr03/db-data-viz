import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, NODE_ENV } = process.env;

const sequelize = NODE_ENV === "production" ? new Sequelize({
        dialect: "postgres",
        host: DB_HOST,
        port: 5342,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
    })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
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