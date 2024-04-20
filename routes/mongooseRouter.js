import express from 'express';
var router = express.Router();
import { showForm, sendForm } from '../controllers/productController_v2.js';

/* GET home page. */
router.get('/', showForm);

router.post('/registered', sendForm);

export default router;