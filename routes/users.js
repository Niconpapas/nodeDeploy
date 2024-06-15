import express from 'express';
import { getLoginForm, getRegisterForm, userRegister, userLogin, userLogout } from '../controllers/user.js';
import { check, body , query} from 'express-validator'

var router = express.Router();

/* GET users listing. */
router.get('/register', getRegisterForm);
router.get('/login',getLoginForm);


router.post('/register',[
  check('name').not().isEmpty().isLength({Min:3}),
  check('email').not().isEmpty().isEmail(),
  check('password').not().isEmpty().isLength({Min:3})
  ], userRegister);

router.post('/login',[
  check('email').not().isEmpty().isEmail(),
  check('password').not().isEmpty().isLength({Min:3})
], userLogin);

router.get('/logout', userLogout);


export default router;
