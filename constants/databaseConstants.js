const DB_URL = process.env.DB_URL;

const DB_SETTINGS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'dbChirper';

const Database = {
  DB_URL,
  DB_SETTINGS,
  DB_NAME,
};

module.exports = Database;
