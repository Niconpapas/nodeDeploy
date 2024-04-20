import app from './app.js';
import dotEnv from 'dotenv';

//import connectDB from './database/connect.js';
import connectMongoose from './database/mongooseConnect.js';



//connectDB();  //mongoDB

//Con mongoose
//connectMongoose();

dotEnv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>{
    console.log(`Server Up in http://localhost:${PORT}`);
});