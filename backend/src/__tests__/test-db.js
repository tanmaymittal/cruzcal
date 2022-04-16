require('dotenv').config();

// Set to test database
process.env.POSTGRES_DB = 'cruzcal-test';

module.exports = require('../db');
