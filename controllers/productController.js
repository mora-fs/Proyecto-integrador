const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productsDbPath= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductsDb= JSON.parse(fs.readFileSync(productsDbPath, 'utf-8'));

const controller = {
    productsList: (req, res) =>{
        let products= {
            products: parsedProductsDb
        };
        return res.render('productsList', products);
    },
    detail: (req, res)=>{
        idDetail= req.params.id;
        productDetail= parsedProductsDb.find(product=> product.id == idDetail);
        const productParam= {
            productParam: productDetail
        };
        if (!productDetail){
            return res.send('El producto solicitado no se encontró');
        }
        return res.render('detail', productParam);
    },
    createForm: (req,res) => {
        return res.render('createForm');
    },
    createProduct: (req, res) =>{
        let idLastProduct = (parsedProductsDb.length)-1;
        let idNewProduct = idLastProduct + 1;
        let newProduct = {};
        newProduct.id = idNewProduct;
        newProduct.name = req.body.nombre;
        // newProduct.image = req.body.;
        newProduct.price = req.body.precio;
        newProduct.discount = req.body.discount;
        newProduct.marca = req.body.marca;
        // newProduct.color = req.body.color;
        newProduct.description = req.body.descripcion;
        newProduct.category = req.body.categoria;

        parsedProductsDb.push(newProduct)
        // console.log(finalProduct)
        fs.writeFileSync(productsDbPath, JSON.stringify(parsedProductsDb))
        return res.redirect('/productos')
    },
    editForm: (req, res)=>{
        let idEdit= req.params.id;
        let productEdit= parsedProductsDb.find(producto=>producto.id == idEdit);
        if (productEdit){
            let editParam = {
                editParam: productEdit
            }
            return res.render('editForm', editParam);
        }
        else {
            return res.send("Producto no encontrado...");
        }
    },
    delete: (req, res)=>{
        const idDelete= req.params.id;
        const notDeleted= parsedProductsDb.filter(producto=> producto.id != idDelete);
        fs.writeFileSync(productosDbPath, JSON.stringify(notDeleted, null, 2));
        res.render('productsList')
    }
};

module.exports = controller;