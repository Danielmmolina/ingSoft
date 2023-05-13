const mongoose = require('mongoose');

const Feedbacks = mongoose.model('Feedback', {
    contenido:{
        type: String,
        require: true
    }
});

module.exports= Feedbacks;