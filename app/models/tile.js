var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TileSchema = new Schema({
  title: String,
  url: String,
  user: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
});

// MongoDB has virtual timeStamps everwhere!
TileSchema.virtual('date').get(function(){
  return this._id.getTimestamp();
});

mongoose.model('tiles', TileSchema);
