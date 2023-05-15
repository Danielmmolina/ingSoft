const mongoose = require('mongoose');


const Feedbacks = mongoose.model('Feedback', {
    contenido:{
        type: String,
        require: true
    }
   /* con el comentario y q el brigadista pertenezca a una cuadrilla
    y esa cuadrilla pertenezca a una practica
*/

});

module.exports= Feedbacks;