process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require('dotenv').config();
const {db} = require('../src/db/index');
require('./fetch')(db, reset = true);
