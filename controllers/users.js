const { User } = require('../models');
const mongoose = require('mongoose');

class UserController {

    async update(id, updateValues) {
        const {profilePicture, name, location,description} = updateValues;
        const user = await this.getByID(id);

        user.profilePicture = profilePicture?? user.profilePicture;
        user.name = name ?? user.name;
        user.location = location ?? user.location;
        user.description = description ?? user.description;

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