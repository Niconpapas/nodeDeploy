import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import hbs from 'hbs';


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

hbs.registerPartials('views/partials');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', mongooseRouter);


//Importamos las rutas que utiliza la lib mongoose
//Errors
app.get('*', (req, resp) =>{
  resp.render('error', {
    title: 'Error page',
    message: 'Pagina no encontrada'
  })
});

export default app;