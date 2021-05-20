const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheepSchema = new Schema({
	title: {
		type: String
  },
  text: {
		type: String
  },
  date:{
    type:Date
  },
  userDisplayName :{
    type:String
  },
  username:{
    type:String
  },
  userProfileImage:{
    type:String
  },
  userID :{
    type:String
  }
});

module.exports = mongoose.model('Cheep', CheepSchema);