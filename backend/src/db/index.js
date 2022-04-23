const { Sequelize } = require('sequelize');
const { setup } = require('./setup');

const sequelize = new Sequelize(
  "cruzcal-test",
  "postgres",
  "Hexor147997",
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

console.log(process.env.POSTGRES_DB);

const modelDefiners = [
  require('./models/CourseInfo.model'),
  require('./models/Term.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

setup(sequelize);

module.exports = {
  db: sequelize,
  ...require('./api')(sequelize),
};
