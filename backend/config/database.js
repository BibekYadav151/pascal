// Database configuration
// Replace with actual database connection logic

const config = {
  development: {
    // Add your database configuration here
    // Example for MongoDB:
    // uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pascal_dev'

    // Example for PostgreSQL:
    // host: process.env.DB_HOST || 'localhost',
    // port: process.env.DB_PORT || 5432,
    // database: process.env.DB_NAME || 'pascal_dev',
    // username: process.env.DB_USER || 'postgres',
    // password: process.env.DB_PASSWORD || '',

    // For now, using in-memory storage
    type: 'memory'
  },
  production: {
    // Production database configuration
    type: 'production_db'
  }
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];