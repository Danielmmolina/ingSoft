const mongoose = require('mongoose');

const Cuadrilla = mongoose.model('Cuadrilla', {
    nombre:{
        type: String,
        minlength:3,
        require:true

    },

    brigadistas:{
        type: Array,
        default: []
    },

    sector:{
        type: String,
        minlength:3,
        require:true
    }

});

module.exports= Cuadrilla;