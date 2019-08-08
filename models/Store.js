//Aqui declaramos como construiremos nuestro modelo primero se declara aqui antes que en el server
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storeSchema = new Schema({
    store_name:String,
    direction:String,
    products:[{
                //Aqui hacemos referencia al objeto con su id
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            
    }]
});

// Aqui declaramos una constante llamado product que es el modelo de la parte de arriba este modelo se llamara 'Product'que es lo que lee mongoose, y la referencia es productSchema
const Store = mongoose.model('Store',storeSchema);
module.exports = Store;

