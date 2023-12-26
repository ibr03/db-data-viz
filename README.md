# Database Querying & Visualization

This project is a web application for visualizing patent data using React.js for the frontend, Node.js with Express.js for the backend, and PostgreSQL as the database. The application allows users to search for patents, visualize data using bar and line charts.

## Setup

### Clone the repository
```
git clone https://github.com/ibr03/db-data-viz.git
cd db-data-viz
```
### Install dependencies

Backend (Node.js and Express)
```
cd server
npm install
```

Frontend (React with Vite)
```
cd client
npm install
```

### Database Setup

1. Create a PostgreSQL database and create an .env file with your `DATABASE_URI` and `PORT`

2. Run Sequelize migrations to create necessary tables:
```
cd server
npx sequelize-cli db:migrate
```

### Load Data

Load your csv file into database:
```
cd server
npm run loadData
```

### Run the Application

Backend
```
cd server
npm start
```

The backend server wil run at your configured port.

Frontend
```
cd client
npm run dev
```
### Additional Notes
Ensure PostgreSQL is installed and running on your machine.