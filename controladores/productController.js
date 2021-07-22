const express= require('express');
const app= express();
const fs= require('fs');
const path= require('path');
const productosDB= path.join(__dirname, '../data/productsDataBase.json');
const parsedProductosDB= JSON.parse(fs.readFileSync(productosDB, 'utf-8'));

const controlador = {
    productos: (req, res) =>{
        res.render('productos');
    },
    crear: (req, res) =>{
        res.render('crear-form');
    },
    guardarProd: (req, res) =>{
        res.send(req.body);
    },
    detalle: (req, res)=>{
        idDetalle= req.params.id;
        productoDetalle= parsedProductosDB.find(producto=> producto.id == idDetalle);
        const productoParam= {
            productoParam: productoDetalle
        };
        //res.send(idDetalle);
        res.render('detalle', productoParam);
    }
};

module.exports = controlador;