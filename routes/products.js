import express from 'express';
var router = express.Router();
import { showForm, sendForm } from '../controllers/productsControllers.js';

/* GET home page. */
router.get('/', showForm);

router.post('/registered', sendForm);

export default router;