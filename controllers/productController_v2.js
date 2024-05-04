//Con mongoose
import Product from '../models/productModel.js';

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
            image: image.lenght == 0  ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZH8sToqqq_j0UrGvX0wNTXHrk5445Pgamk-LZj_bbQQ&s"
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
    const singleProduct = await Product.findById({_id: id});
    console.log(id);

    try {
        return res.render('productDetails',{
            product: singleProduct
        });
        
    } catch (error) {
        console.log(error);
    }

};

export { showForm, sendForm, listProductsTable, listProductsCard, viewSingleProduct }