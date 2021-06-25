const express = require('express');

const controlador = {
    carrito: (req, res) => {
        res.render('carrito');
    }
};

module.exports = controlador;