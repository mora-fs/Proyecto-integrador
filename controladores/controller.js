const express = require('express');

const controlador = {
    carrito: (req, res) => {
        res.render('carrito');
    },
    producto: (req, res)=>{
        res.render('product');
    }
};

module.exports = controlador;