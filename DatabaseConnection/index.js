const findAll = require('./findAll');
const getCollectionByFilter = require('./getCollectionByFilter');
const insertDocument = require('./insertDocument');

const DatabaseConnection = {
  findAll,
  getCollectionByFilter,
  insertDocument,
};

module.exports = DatabaseConnection;
