
import mongoose from 'mongoose';


mongoose.set('strictQuery', false);
export const mon = mongoose.connect('mongodb+srv://careerpane:CareerPane1234@jobportal.dg2edwj.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true});



// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/cruddb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

export default mon;

