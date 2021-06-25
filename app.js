const express = require('express')
const path = require('path')

const app = express()


const publicPath = path.resolve(__dirname, './public')
const loginPath = path.resolve(__dirname, './views/login.html')
app.use(express.static(publicPath))

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
})

// ACA PUSE LA "ESTRUCTURA" DE EL SISTEMA DE RUTEO, ASI VAYA CADA UNO AGREGANDO SU PARTE O CORRIGIENDO"
const rutas = require('./routes/rutas');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', rutas);


app.get('/product', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/product.html'))
})

app.get('/login', (req, res) => res.sendFile(loginPath))

// app.get('/carrito', (req, res) => {
//     res.sendFile(carritoPath);
// });