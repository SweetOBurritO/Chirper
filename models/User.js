const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    email:{
        type:String,
        default: ''
    },
    description :{
        type:String,
        default: ''
    },
    location:{
        type:String,
        default: ''
    },
    dateOfBirth : {
        type:Date,
        default: Date.now()
    },
    profilePicture :{
        type: String,
        default: '/static/images/defaultProfileImage.jpg'
    },
    bannerPicture :{
        type: String,
        default: ''
    },
    followers :{
        type:Array,
        default: []
    },
    following :{
        type:Array,
        default: []
    },
    twitterID :{
        type:Number
    },
    googleID :{
        type:Number
    }
});

module.exports = mongoose.model('User', UserSchema);