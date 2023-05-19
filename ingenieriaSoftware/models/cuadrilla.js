const mongoose = require('mongoose');

const Cuadrilla = mongoose.model('Cuadrilla', {
    nombre:{
        type: String,
        require: true
    }
});

module.exports= Cuadrilla;