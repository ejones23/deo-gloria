const { MongoClient } = require('mongodb');

//TODO use secret
const uri = "mongodb+srv://dbadmin:u4ZS7ZBzfUFc!@Y@cluster0.zsse0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
  const collection = client.db("deo").collection("users");
  console.log('Success!')

  // perform actions on the collection object
  client.close();
});