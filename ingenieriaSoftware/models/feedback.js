const mongoose = require('mongoose');

const Feedbacks = mongoose.model('Feedback', {
    contenido:{
        type: String,
        require: true,
        minLength: 30,
        maxLength: 350
    }
});

module.exports= Feedbacks;