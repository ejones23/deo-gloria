const { MongoClient } = require('mongodb');

const uri = process.env.DG_DB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  getUser: async function(name) {
    let connection = await client.connect();
    let collection = connection.db('deo').collection('users');

    return await collection.findOne({'name': name});
  },

  addUser: async function(username, salt, hash) {
    let connection = await client.connect();
    let collection = connection.db('deo').collection('users');

    return await collection.insertOne({ name: username, salt: salt, hash: hash });
  }
};