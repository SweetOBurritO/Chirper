const Cheep = require('../models').Cheep;
const {ObjectId} = require('mongodb');

const {
  insertDocument,
  getCollectionByFilter,
} = require('../DatabaseConnection');

function mapCheepsData(params) {
  const {_id, text, date, username, userImageUrl} = params;
  const cheep = new Cheep(text, date, username, userImageUrl, _id);
  return cheep;
}


class CheepController {
  async insert(cheep) {
    if (!cheep instanceof Cheep) {
      throw new Error('Not A Valid Cheep Object');
    }
    const result = await insertDocument('Cheeps', cheep);

    return result.insertedCount >= 1;
  }

  async update() {

  }

  async delete() {

  }

  async get(query) {
    const cheepsRaw = await getCollectionByFilter('Cheeps', query);

    const cheeps = cheepsRaw.map(mapCheepsData);
    return cheeps;
  }

  async getByID(id) {
    const cheepsRaw = await getCollectionByFilter(
        'Cheeps',
        // eslint-disable-next-line new-cap
        {_id: ObjectId(id)},
    );

    const cheep = cheepsRaw.map(mapCheepsData);
    return cheep;
  }
}

module.exports = CheepController;
