const express = require('express')
const path = require('path')

const app = express()

const publicPath = path.resolve(__dirname, './public')
const loginPath = path.resolve(__dirname, './views/login.html')
const carritoPath = path.resolve(__dirname, './views/carrito.html')
app.use(express.static(publicPath))

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
})

app.get('/product', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/product.html'))
})

app.get('/login', (req, res) => res.sendFile(loginPath))

app.get('/carrito', (req, res) => {
    res.sendFile(carritoPath);
});