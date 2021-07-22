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
        if (!productoDetalle){
            return res.send('El producto solicitado no se encontró');
        }
        res.render('detalle', productoParam);
    },
    editar: (req, res)=>{
        const idEdit= req.params.id;
        const productoEdit= parsedProductosDB.find(producto=>producto.id == idEdit);
        if (!productoEdit){
            return res.send('El producto solicitado no se encontró');
        }
        const editarParam={
            editarParam: productoEdit
        }
        return res.render('edit-form', editarParam);
    },
    delete: (req, res)=>{
        const idDelete= req.params.id;
        res.send(idDelete);
    }
};

module.exports = controlador;