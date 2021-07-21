const express= require('express');
const app= express();
const fs= require('fs');
const path= require('path');
const productosDB= path.join(__dirname, '../data/productosDatabase.json');
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
        res.render('detalle');
    }
};

module.exports = controlador;