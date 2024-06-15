import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import hbs from 'hbs';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import productRouter from './routes/products.js';
import mongooseRouter from './routes/mongooseRouter.js'

const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

hbs.registerPartials('views/partials');

//sesion con mongo storage / connect mongo
const sessionKey = process.env.SECRET_SESSION;
const sessionDB = process.env.MONGOOSE_ATLAS;
app.use(session({
  store: new MongoStore({
    mongoUrl: sessionDB,
    touchAfter: 24 * 3600 // time period in seconds
  }),
  secret: sessionKey,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  cookie:{
    maxAge:60000
  }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', mongooseRouter);



//Importamos las rutas que utiliza la lib mongoose
//Errors
app.get('*', (req, resp) => {
  resp.render('error', {
    title: 'Error page',
    message: 'Pagina no encontrada'
  })
});

export default app;