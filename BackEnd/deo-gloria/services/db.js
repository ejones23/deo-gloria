const { MongoClient } = require('mongodb');

//TODO use secret
const uri = process.env.DG_DB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
  const collection = client.db("deo").collection("users");
  console.log('Success!')

  // perform actions on the collection object
  client.close();
});