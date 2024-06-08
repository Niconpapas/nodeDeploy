import jwt from "jsonwebtoken";

const generateJWT = async (user) => {

    const token = jwt.sign({ user }, process.env.APP_JWT);

    return token;
}

const verifyJWT = async (token) => {

}

export { generateJWT, verifyJWT }