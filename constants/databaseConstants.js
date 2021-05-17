const DB_URL = process.env.DB_URL;

const DB_SETTINGS = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };


const Database = {
  DB_URL,
  DB_SETTINGS
};

module.exports = Database;
