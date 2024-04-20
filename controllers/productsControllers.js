//const fs = require('node:fs')
import { MongoClient } from 'mongodb';
//const MongoClient = require('mongodb').MongoClient;

import dotenv from 'dotenv';
const database = 'cursoNode';

dotenv.config();

//const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGO_ATLAS = process.env.MONGO_ATLAS;
//const client = new MongoClient(MONGO_ATLAS);

const client = new MongoClient('mongodb+srv://fnc1001:U04NoQIUZJTbv38r@cluster0.xduuynj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');



let products = [];

const showForm = (req, res) => {
    res.render('productRegister', {
        title: "Registrar producto"
    });
}

const sendForm = (req, resp) => {
    const { name, price, stock, image } = req.body;
    const product = {
        productName: name,
        productPrice: price,
        productStock: stock,
        productImg: image
    };

    console.log(product);


    products.push(product);

    // fs.writeFileSync('files/prductsSynch.txt', JSON.stringify(products));

    // fs.writeFile('files/prductsAsych.txt', JSON.stringify(products), (err) =>{
    //     if(err){
    //         console.log(err);
    //         fs.writeFile('files/error.txt', err);
    //     }
    // });

    // fs.appendFile('files/prductsAsych.txt', JSON.stringify(products), (err) =>{
    //     if(err){
    //         console.log(err);
    //         fs.writeFile('files/error.txt', err);
    //     }
    // });

    //Enviar a DB Local
    //Insert //comentado por rancio , inserta en la conexion
    const db = client.db(database);
    const collection = db.collection('documents');
    collection.insertOne({
        name: name,
        price: price,
        stock: stock,
        image: image
    });


    resp.json({
        name: name,
        price: price,
        stock: stock,
        image: image
    });
};

export  { showForm, sendForm };