const { User } = require('../models');
const mongoose = require('mongoose');

class UserController {

    async update(id, updateValues) {
        const user = await this.getByID(id);

        user.profilePicture = updateValues.profilePicture ?? user.profilePicture;
        user.name = updateValues.name?? user.name;
        user.location = updateValues.location ?? user.location;
        user.description = updateValues.description ?? user.description;

        const result = await user.save();

        return !!result;
    }

    async getByID(id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const user = User.findById(id);

            return user;
        }
        return null;
    }
}

module.exports = UserController;