const findAll = require('./findAll');
const getCollectionByFilter = require('./getCollectionByFilter');

const DatabaseConnection = {
  findAll,
  getCollectionByFilter,
};

module.exports = DatabaseConnection;
