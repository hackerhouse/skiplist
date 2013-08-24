
/*
 * GET home page.
 */


function deriveTiles() {
  console.log("DERIVETILES");

}

exports.index = function(req, res){
  mongo_client = require('mongodb').MongoClient;
  format = require('util').format; 
  mongo_client.connect('mongodb://127.0.0.1:27017/linkshare', function(err, db) {
    collection = db.collection('tiles');
    hhhh = collection.find().toArray(function(err, results) {
        console.log(results);
        res.render('index', { title: 'Express', tiles: results });
      }); 
  });
  
};


