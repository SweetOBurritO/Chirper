class Cheep {
  constructor(text, date, username, userImageUrl, _id = null) {
    this.text = text;
    this.date = date;
    this.username = username;
    this.userImageUrl = userImageUrl;
    this._id = _id;
  }
}

module.exports = Cheep;
