import express from 'express';
var router = express.Router();
import { showForm, sendForm, listProductsTable, listProductsCard, viewSingleProduct } from '../controllers/productController_v2.js';

/* GET home page. */
router.get('/', showForm);

router.post('/registered', sendForm);

router.get('/list', listProductsTable);

router.get('/listCards', listProductsCard);

router.post('/product/:_id', viewSingleProduct);

export default router;