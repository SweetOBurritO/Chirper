const MongoClient = require('mongodb').MongoClient;
const Constants = require('../constants');

const updateDocument = async (collectionName, id, document)=>{
  const client = new MongoClient(
      Constants.Database.DB_URL,
      Constants.Database.DB_SETTINGS,
  );

  let result = null;

  try {
    const connection = await client.connect();
    const database = connection.db(Constants.Database.DB_NAME);
    const collection = await database.collection(collectionName);
    const options = {'upsert': false};
    const update = {
      $set: {
        ...document,
      },
    };
    result = await collection.updateOne({_id: id}, update, options);
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
  return result;
};

module.exports = updateDocument;
