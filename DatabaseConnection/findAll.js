const getCollectionByFilter = require('./getCollectionByFilter');

const findAll = async (collectionName)=>{
  const results = await getCollectionByFilter(collectionName, {});

  return results;
};

module.exports = findAll;
