const { Sequelize } = require('sequelize');
const { setup } = require('./setup');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

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
