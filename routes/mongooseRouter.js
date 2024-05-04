import express from 'express';
var router = express.Router();
import { showForm, sendForm, listProductsTable, listProductsCard, viewSingleProduct, deleteSingleProduct, updateSingleProduct, updateProductForm } from '../controllers/productController_v2.js';

/* GET home page. */
router.get('/', showForm);

router.post('/registered', sendForm);

router.get('/list', listProductsTable);

router.get('/listCards', listProductsCard);

router.get('/product/:_id', viewSingleProduct);
router.get('/update/:_id', updateProductForm);


router.post('/delete/:_id', deleteSingleProduct);
router.post('/update/:_id', updateSingleProduct);


export default router;