import { request, response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import sendEmail from "../services/mailRegisterResponse.js";
import { generateJWT, verifyJWT } from "../services/jwt.js";
import jwt from "jsonwebtoken";


const getLoginForm = async (req = request, res = response) => {


    const cookieToken = req.cookies.xToken;
    if (cookieToken != null) {
        try {
            const validToken = await jwt.verify(cookieToken, process.env.APP_JWT);
            if (validToken) {
                return res.render('userLogin', {
                    error_msg: 'Usuario ya logeado'
                });
            }
        }
        catch(err) {
            res.render('userLogin', {
                error_msg: "Login Error"
            });
        };
    }

    res.render('userLogin');
};

const getRegisterForm = (req = request, res = response) => {
    res.render('userRegister');
};

const userRegister = async (req = request, res = response) => {
    const errors = validationResult(req);

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

        //Enviar a DB 
        await user.save();

        //asiganr jwt al user

        //enviar mail de bienvenida
        //await sendEmail(user.email);

        return res.render('index');
    }
    catch (err) {
        if (err.code == 11000) { //Mail exists
            return res.render('userRegister', {
                error_msg: "Email duplicado"
            });
        }
        return res.render('error', { message: err.message });
    }

};

const userLogin = async (req = request, res = response) => {
    

    const errors = validationResult(req);

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


    if (!userExists) {
        res.render('userLogin', {
            error_msg: "No existe el usuario"
        });
    }

    try {
        const checkPassword = await bcrypt.compareSync(password, userExists[0].password);

        if (!checkPassword) {
            return res.render('userLogin', {
                error_msg: "email/password incorretos"
            });
        }
        else {
            const token = await generateJWT(userExists);

            //Add token to the session
            req.session.user = {
                _id: userExists[0].id,
                nombre: userExists[0].name,
                email: userExists[0].email,
                token: token
            };

            await req.session.save();

            console.log("Usuario autenticado");

            res.cookie('xToken', token); //Set custom headers / cookies

            res.render('index');
        }
    } catch (error) {
        console.log(error);
        res.render('userLogin', {
            error_msg: "error on login"
        });
    }
};

const userLogout = async (req = request, res = response) => {
    res.clearCookie('xToken');
    req.session.destroy(); //Borra en la db
    res.clearCookie('connect.sid'); //Borra en el browser
    res.render('index');
}

export { getLoginForm, getRegisterForm, userRegister, userLogin, userLogout };