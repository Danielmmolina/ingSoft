//Se importa modelo feedback
const Feedback = require('../models/feedback');  

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

//se crea controlador para obtener comentarios

const getFeedback = (req, res) => {
    Feedback.find({}, (err, feedbacks) =>{
        if(err){
            return res.status(400).send('ERROR: no se pudieron obtener los comentarios');
        }
        return res.status(201).send(feedbacks);
    })    
}

//Se crea controlador para actualizar un comentario

const updateFeedback = (req, res) =>{
    const {id} = req.params;
    Feedback.findByIdAndUpdate(id, req.body, (err, feedbacks)=>{
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener el comentario');
        }
        if(!feedbacks){
            return res.status(400).send('ERROR: no existe el comentario');
        }
            return res.status(201).send(feedbacks);
    })
    }

//Se crea el controlador para eliminar un comentario

const deleteFeedback = (req, res) =>{
    const {id} = req.params;
    Feedback.findByIdAndDelete(id, (err, feedbacks)=>{
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener el comentario');
        }
        if(!feedbacks){
            return res.status(400).send('ERROR: no existe el comentario');
        }
            return res.status(201).send(feedbacks);
        
    })
}









module.exports={
    createFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback
}