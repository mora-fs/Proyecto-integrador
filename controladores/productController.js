const express= require('express');
const app= express();
const fs= require('fs');
const { parse } = require('path');
const path= require('path');
const productosDB= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductosDB= JSON.parse(fs.readFileSync(productosDB, 'utf-8'));

const controlador = {
    productos: (req, res) =>{
        res.render('productos');
    },

    detalle: (req, res)=>{
        idDetalle= req.params.id;
        productoDetalle= parsedProductosDB.find(producto=> producto.id == idDetalle);
        const productoParam= {
            productoParam: productoDetalle
        };
        if (!productoDetalle){
            return res.send('El producto solicitado no se encontró');
        }
        res.render('detalle', productoParam);
    },

    createForm: (req,res) => {
        return res.render('crear-form');
    },

    createProduct: (req, res) =>{

        let idLastProduct = (parsedProductosDB.length)-1;
        let idNewProduct = idLastProduct + 1;
        
        let newProduct = {};

        newProduct.id = idNewProduct;
        newProduct.name = req.body.nombre;
        // newProduct.image = req.body.;
        newProduct.price = req.body.precio;
        newProduct.descuento = req.body.descuento;
        newProduct.marca = req.body.marca;
        // newProduct.color = req.body.color;
        newProduct.description = req.body.descripcion;
        newProduct.category = req.body.categoria;

        return res.send(newProduct)
    },

    editForm: (req, res)=>{
        let idEdit= req.params.id;
        let productoEdit= parsedProductosDB.find(producto=>producto.id == idEdit);
        if (productoEdit){
            let editarParam={
                editarParam: productoEdit
            }
            return res.render('edit-form', editarParam);
        }
        else{
            return res.send("Producto no encontrado...");
        }
    },

    delete: (req, res)=>{
        const idDelete= req.params.id;
        const productosNoBorrados= parsedProductosDB.filter(producto=> producto.id != idDelete);
        fs.writeFileSync(productosDB, JSON.stringify(productosNoBorrados, null, 2));
        res.render('productos')
    }
};

module.exports = controlador;