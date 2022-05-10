require('dotenv').config();

const app = require('./app.js');
const {db} = require('./db');

db.sync({force: false})
  .then(() => {
    app.listen(8080, () => {
      console.log(`Server Running: http://localhost:8080`);
      console.log('API Testing UI: http://localhost:8080/api/docs/');
    });
  })
  .catch(() => {
    console.error(`Couldn't start database`);
  });


module.exports = app;
