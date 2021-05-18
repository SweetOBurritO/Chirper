const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    email:{
        type:String
    },
    description :{
        type:String
    },
    location:{
        type:String
    },
    dateOfBirth : {
        type:Date
    },
    profilePicture :{
        type: String
    },
    bannerPicture :{
        type: String
    },
    followers :{
        type:Array
    },
    following :{
        type:Array
    },
    twitterID :{
        type:Number
    },
    googleID :{
        type:Number
    }
});

module.exports = mongoose.model('User', UserSchema);