const mongoose = require('mongoose');

const Practica = mongoose.model('Practica', {
    nombre_practica:{
        type: String,
        minlength: 3,
        require: true
    },

    descripcion:{
        type: String,
        minlength: 20,
        maxlenght: 200,
        require: true
    },

    fecha:{
        type: Date,
        require: true,
    },

    lugar:{
        type: String,
        minlength: 6,
        maxlength: 50,
        require: true
    },

    herramientasEquipo:{
        type: String,
        minlength: 6,
        maxlength: 100,
        require: true
    },

    escuadrilla:{
        type: String,
        minlength: 13,
        maxlength: 25,
        require: true
    },
    
    comentarios:{
        type: Array,
        default: []
    }

});

module.exports = Practica;