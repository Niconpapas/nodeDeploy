import { request, response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const getLoginForm = (req = request, res = response) => {
    res.render('userLogin');
};

const getRegisterForm = (req = request, res = response) => {
    res.render('userRegister');
};

const userRegister = async (req = request, res = response) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.render('userRegister', {
            error_msg: 'Datos invalidos'
        });
    }

    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);

        const user = new User({
            name: name,
            email: email,
            password: await bcrypt.hash(password, salt)
        });
        console.log(user);

        //Enviar a DB 
        await user.save();

        //asiganr jwt al user

        //enviar mail de bienvenida

        return res.render('index');
    }
    catch (err) {
        if (err.code == 11000) { //Mail exists
            return res.render('userRegister', {
                error_msg: "Email duplicado"
            });
        }
        console.log(err.code);
        return res.render('error', { message: err });
    }

};

const userLogin = async (req = request, res = response) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.render('userLogin', {
            error_msg: 'email/password incorretos'
        });
    }

    const { email, password } = req.body;


    const user = {
        email: email,
        password: password
    };

    const userExists = await User.find({ email: email });
    console.log("----");
    console.log(userExists);

    if (!userExists) {
        res.render('userLogin', {
            error_msg: "No existe el usuario"
        });
    }

    try {   
        console.log("adasdaa");
        const checkPassword = await bcrypt.compareSync(password, userExists[0].password);
        console.log("---2");
        console.log(checkPassword);

        if(!checkPassword){
            res.render('userLogin', {
                error_msg: "email/password incorretos"
            });
        }
    } catch (error) {
        console.log(error);
        res.render('userLogin', {
            error_msg: "error on login"
        });
    }
};

//Enviar a DB 


//asiganr jwt al user

//enviar mail de bienvenida




export { getLoginForm, getRegisterForm, userRegister, userLogin };