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
  picture: String
});

// MongoDB has virtual timeStamps
UserSchema.virtual('date').get(function(){
  return this._id.getTimestamp();
});

mongoose.model('User', UserSchema);
