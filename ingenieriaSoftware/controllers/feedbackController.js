//Se importa modelo feedback
const Feedback = require ('../models/feedback');  

//Se crea controlador para crear un comentario
const createFeedback = (req, res) => {
    const {contenido} = req.body;
    const newFeedback = new Feedback ({
        contenido
    });
    newFeedback.save((err, Feedback) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo crear el comentario');
        }
        return res.status(201).send(Feedback)
    });
}

module.exports={
    newFeedback
}