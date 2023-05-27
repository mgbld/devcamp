const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({
  path: './config/config.env',
});

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev Loggin Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Nount routers
app.use('/api/v1/bootcamps', bootcamps);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
