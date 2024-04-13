// const { MongoClient, ServerApiVersion } = require('mongodb');

// const dotenv = require('dotenv');

// dotenv.config();

// const MONGO_ATLAS = process.env.MONGO_ATLAS;

// const client = new MongoClient(MONGO_ATLAS, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


import { MongoClient } from 'mongodb';
//const MongoClient = require('mongodb').MongoClient;

import dotenv from 'dotenv';
const database = 'cursoNode';


dotenv.config();

const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGO_ATLAS = process.env.MONGO_ATLAS;

const client = new MongoClient(MONGO_ATLAS);

const connectDB = async () => {
    try{
        await client.connect();

         //Select/Create DB
         const db = client.db(database);
         const collection = db.collection('documents');
 
        console.log('Connected successfully to MongoDB: ' + MONGO_ATLAS + " db: " + db.databaseName);

    }
    catch(err){
        console.log(err);

    }
};

export default connectDB;
