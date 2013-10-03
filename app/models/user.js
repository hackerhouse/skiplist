var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: String,
  birthday: String,
  family_name: String,
  gender: String,
  given_name: String,
  link: String,
  locale: String,
  name: String,
  picture: String,
  created: {type: Date, 'default': Date.now},
});

mongoose.model('User', UserSchema);
