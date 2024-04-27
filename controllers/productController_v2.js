//Con mongoose
import Product from '../models/productModel.js';

//const product = new Product();

const showForm = (req, res) => {
    res.render('productRegister', {
        title: "Registrar producto"
    });
};

const sendForm = async (req, res) => {
    const { name, price, stock, image } = req.body;
    try {
        const producto = new Product({
            name: name,
            price: price,
            stock: stock,
            image: image
        });
        console.log(producto);

        //Enviar a DB 
        producto.save().catch((err) => {
            return res.render({ message: err });
        });

        return res.send(producto);
    }
    catch (err) {
        console.log(err);
        return res.render({ message: err });
    }
};

const listProductsTable = async (req, resp) => {
    try {
        const productList = await Product.find();

        console.log(productList);

        return resp.render('productList', {
            message: "Return de todos los productos",
            products: productList
        });
    } catch (error) {
        return resp.render('error', {
            message: "Error en la carga de productos"
        });
    }

};

const listProductsCard = async (req, resp) => {
    try {
        const productList = await Product.find();

        console.log(productList);

        return resp.render('productListCards', {
            message: "Return de todos los productos cards",
            products: productList
        });
    } catch (error) {
        return resp.render('error', {
            message: "Error en la carga de productos"
        });
    }
};

export { showForm, sendForm, listProductsTable, listProductsCard }