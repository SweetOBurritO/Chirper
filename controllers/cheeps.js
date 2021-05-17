const {Cheep} = require('../models');

class CheepController {
  async insert(cheep) {
    if (!(cheep instanceof Cheep)) {
      throw new Error('Not A Valid Cheep Object');
    }
    const result = await cheep.save();

    return !!result;
  }

  async update(id, updateValues) {
    const { title, text, date} = updateValues;
    const cheep = await Cheep.findById(id);

    cheep.text = text ?? cheep.text;
    cheep.date = date ?? cheep.date;
    cheep.title = title ?? cheep.title;

    const result = await cheep.save();

    return !!result;
  }

  async delete(id) {
    const result = await Cheep.deleteOne({_id:id});

    return result.deletedCount >= 1;
  }

  async get(query) {
    const cheeps = Cheep.find(query);
    return cheeps;
  }

  async getByID(id) {
    const cheep = Cheep.findById(id);
    return cheep;
  }
}

module.exports = CheepController;
