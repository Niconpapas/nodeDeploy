import app from './app.js';
import dotEnv from 'dotenv';

import connectDB from './database/connect.js';

connectDB();

dotEnv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>{
    console.log(`Server Up in http://localhost:${PORT}`);
});