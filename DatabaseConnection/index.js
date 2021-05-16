const getCollectionByFilter = require('./getCollectionByFilter');
const insertDocument = require('./insertDocument');
const updateDocument = require('./updateDocument');
const deleteDocument = require('./deleteDocument');

const DatabaseConnection = {
  getCollectionByFilter,
  insertDocument,
  updateDocument,
  deleteDocument,
};

module.exports = DatabaseConnection;
