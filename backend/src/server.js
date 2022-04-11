require('dotenv').config();
const app = require('./app.js');

app.listen(3010, () => {
  console.log(`Server Running: http://localhost:3010`);
  console.log('API Testing UI: http://localhost:3010/api-docs/');
});
