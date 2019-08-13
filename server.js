const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const URL_MONGO = 'mongodb+srv://Jair1312:dark5813@cluster0-ajnvi.mongodb.net/test?retryWrites=true&w=majority'
const cors = require('cors');

//¨Para checar si esta conectado
mongoose.connect(URL_MONGO,{useNewUrlParser:true},(err)=>{
    if(!err) console.log('Conexion exitosa con mongodb')
})

const Product = require('./models/Product');
const Store = require('./models/Store');

const PORT =process.env.PORT||3030;
const app = express();

//Este sirve para que un objeto lo detecte como un json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

app.get('/',(req,res)=>{
    res.send({message:'Server on'})
})

app.post('/create/store',(req,res)=>{
    //Aqui creamos el objeto despues de declararlo en tienda
    //esta parte de aqui es la parte de req entrada
    const {store_name,direction,products} = req.body;
    console.log(req.body);
    const newStore = Store({
        store_name,direction,products
    })

    newStore.save((err,store)=>{
        err
            ? res.status(409).send(err)
            : res.status(201).send(store)
    })
})

//Este es el objeto tipo type 
app.post('/create/product',(req,res)=>{
    const{name,price,stock} = req.body;
    console.log(req.body);
    const newProduct = Product({
        name,
        price,
        stock
    })
    // Aqui es la respuest puede ser un error o mandar el prodcuto
    newProduct.save((err,product)=>{
        err
        ? res.status(409).send(err)
        : res.status(201).send(product)
    })
});

app.get('/store/:idStore',(req,res)=>{
    const {idStore} = req.params;
    Store.findById(idStore).populate('products')
    .exec()
    .then(Store => res.send(Store))
    .catch(err => res.status(409).send(err))

})

app.get('/all/products',(req,res)=>{
    Product.find().exec()
    .then(products => res.send(products))
    .catch(err => res.status(409).send(err))
})



app.listen(PORT,() =>{
    console.log(`Server conected ${PORT}`);
})