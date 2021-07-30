const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const path = require('path')
const publicPath = path.resolve(__dirname, './public')
app.use(express.static(publicPath))

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
})
app.set('view engine', 'ejs');
app.set('views', './views');

// ACA PUSE LA "ESTRUCTURA" DE EL SISTEMA DE RUTEO, ASI VAYA CADA UNO AGREGANDO SU PARTE O CORRIGIENDO"
const rutasMain = require('./routes/rutasMain');
const rutasProductos= require('./routes/rutasProductos');

app.use('/', rutasMain);
app.use('/products', rutasProductos);