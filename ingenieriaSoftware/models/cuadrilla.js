const mongoose = require('mongoose');

const Feedbacks = mongoose.model('Cuadrilla', {
    nombre:{
        type: String,
        require: true
    }
});

module.exports= Feedbacks;