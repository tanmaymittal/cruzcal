require('dotenv').config();
const {db} = require('../src/db/index');
require('./fetch')(db);
