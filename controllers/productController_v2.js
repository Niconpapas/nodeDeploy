//Con mongoose
import Product from '../models/productModel.js';
import { request, response } from 'express';

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
            image: image.lenght == 0 ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZH8sToqqq_j0UrGvX0wNTXHrk5445Pgamk-LZj_bbQQ&s"
        });
        console.log(producto);

        //Enviar a DB 
        await producto.save();
        return res.render('productRegistered');
    }
    catch (err) {
        console.log(err);
        return res.render('error', { message: err });
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

const viewSingleProduct = async (req, res) => {
    const id = req.params._id;
    try {
        const singleProduct = await Product.findById({ _id: id });

        return res.render('productDetails', {
            product: singleProduct,
            message: "Detalles"
        });

    } catch (error) {
        console.log(error);
    }

};

const updateSingleProduct = async (req = request, res = response) => {
    const id = req.params._id;
    const { name, price, stock, image } = req.body;
    try {
        const producto = {
            name: name,
            price: price,
            stock: stock,
            image: image.lenght == 0 ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZH8sToqqq_j0UrGvX0wNTXHrk5445Pgamk-LZj_bbQQ&s"
        };
        const updatedProduct = await Product.findByIdAndUpdate(id, producto);
        console.log(updatedProduct);

        const productList = await Product.find();

        return res.render('productListCards', {
            message: "Return de todos los productos cards",
            products: productList
        });

    } catch (error) {
        console.log(error);

    }

}

const updateProductForm = async (req = request, res = response) => {
    const id = req.params._id;

    try {
        const getProduct = await Product.findById(id);
        return res.render('productUpdate', {
            message: "Update product",
            product: getProduct
        });


    } catch (error) {
        console.log(error);
    }

}

const deleteSingleProduct = async (req = request, res = response) => {
    const id = req.params._id;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        console.log(deleteProduct);

        const productList = await Product.find();

        return res.render('productListCards', {
            message: "Return de todos los productos cards",
            products: productList
        });

    } catch (error) {
        console.log(error);
    }
}


export { showForm, sendForm, listProductsTable, listProductsCard, viewSingleProduct, updateSingleProduct, deleteSingleProduct, updateProductForm }