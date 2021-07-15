const express = require('express');

const controlador = {
    carrito: (req, res) => {
        res.render('carrito');
    },
    producto: (req, res)=>{
        res.render('product');
    },
    login: (req, res) => {
        res.render('login');
    },
    loginValidacion: (req, res) => {
        
    } 
};

module.exports = controlador;