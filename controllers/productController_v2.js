//Con mongoose
import Product from '../models/productModel.js'

const showForm = (req, res) => {
    res.render('productRegister', {
        title: "Registrar producto"
    });
}

const sendForm = async (req, res) => {
    const { name, price, stock, image } = req.body;
    try {
        const producto = new Product ({
            name: name,
            price: price,
            stock: stock,
            image: image
        });
        console.log(producto);
        //Enviar a DB 
        // await Product.save(producto, (err, producto) => {
        //     if (err) {
        //         console.log(err);
        //         return res.render({ message: err });
        //     }
        // });
        await producto.save();

        return res.send(producto);
    }
    catch (err) {
        console.log(err);
        return res.render({ message: err });
    }
}

export { showForm, sendForm }