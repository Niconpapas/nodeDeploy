import mongoose from "mongoose";
import dotenv from 'dotenv';

const database = 'cursoNode';

dotenv.config();

const connString = process.env.MONGOOSE_LOCAL;


const connectMongoose = mongoose.connect(connString).then(
    () => {
        console.log('Connected successfully to MongoDB: ' + connString);

    },
    err => {
        console.log(err);

    }
);

export default connectMongoose;