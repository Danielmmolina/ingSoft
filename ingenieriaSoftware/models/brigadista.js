const mongoose = require('mongoose');


const BrigadistaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        minlength: 3,
        require: true
    },

    apellido:{
        type: String,
        minlength: 3,
        require: true
    },

    rut:{
        type: String,
        minlength: 9,
        maxlength: 10,
        require: true,
        unique: true
    },

    email:{
        type: String,
        require: true,
        unique: true
    },

    edad:{
        type: Number,
        require: true,
        minlength: 2,
        maxlength: 2
    },

    telefono:{
        type: Number,
        require: true,
        unique: true,
        minlength: 9,
        maxlength: 9
    },
},

{
    timestamps:true
});

const Brigadista = mongoose.model('Brigadista', BrigadistaSchema);

module.exports = Brigadista;