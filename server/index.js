import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { sequelize } from './config/db.js';
import router from './routes/dataRoute.js';
import loadData from './scripts/loadData.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;

// Application level middleware
app.use(cors());

// Built-in middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

// Routes
app.use('/api', router);

// Connect with database
connectDB();

// ** Below commented code is for seeding database with the csv file ** //
//const eraseDatabaseOnSync = true;

sequelize.sync().then(async () => {
    // seed database with csv data
    await loadData();
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
);