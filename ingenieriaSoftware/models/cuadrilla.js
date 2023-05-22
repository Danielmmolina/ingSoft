const mongoose = require('mongoose');

const Cuadrilla = mongoose.model('Cuadrilla', {
    nombre: {
        type: String,
        minlength: 3,
        maxlength: 32,
        require: true
    },

    brigadistas: [{
        type: mongoose.Schema.ObjectId,
        ref: "Brigadista"
    }],

    sector: {
        type: String,
        minlength: 3,
        require: true
    }
});

module.exports = Cuadrilla;