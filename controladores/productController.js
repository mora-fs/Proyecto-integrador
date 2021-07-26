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

    guardarProd: (req, res) =>{
        res.send("jlivdsñoliwajcs");
    },

    crear: (req,res) => {
        let idEdit= req.params.id;
        let productoEdit= parsedProductosDB.find(producto=>producto.id == idEdit);
        return res.send(productoEdit)
    },

    editar: (req, res)=>{
        let idEdit= req.params.id;
        let productoEdit= parsedProductosDB.find(producto=>producto.id == idEdit);
        if (productoEdit){
            let editarParam={
                editarParam: productoEdit
            }
            return res.render('edit-form', editarParam);
        }
        else{
            return res.send(productoEdit + "hola");
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