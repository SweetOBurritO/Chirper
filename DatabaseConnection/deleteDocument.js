const MongoClient = require('mongodb').MongoClient;
const Constants = require('../constants');

const deleteDocument = async (collectionName, document)=>{
  const client = new MongoClient(
      Constants.Database.DB_URL,
      Constants.Database.DB_SETTINGS,
  );

  let result = null;

  try {
    const connection = await client.connect();
    const database = connection.db(Constants.Database.DB_NAME);
    const collection = await database.collection(collectionName);
    result = await collection.deleteOne(document);
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
  return result;
};

module.exports = deleteDocument;
