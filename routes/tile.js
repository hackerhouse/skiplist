
/*
 * POST tile listing.
 */

exports.create = function(req, res){
  console.log("POSTED TO CREATE TILE");
  console.log(req);
  mongo_client = require('mongodb').MongoClient;
  format = require('util').format; 
  mongo_client.connect('mongodb://127.0.0.1:27017/linkshare', function(err, db) {
    collection = db.collection('tiles');
    collection.insert(req.body, function(err, docs) { return docs; });
    res.send("thank you tile god");
  });
};
