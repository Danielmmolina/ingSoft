const mongoose = require('mongoose');

const practica = mongoose.model('practica', {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipoPractica: {
        type: String,
        required: true
    },
    localizacion: {
        type: String,
        required: true
    },
    herramientas: {
        type: String,
        required: true
    }
})

module.exports = practica;
