const Comments = require ('../models/feedback');
const practicaModel = require('../models/practicaModel');


const addComentario = async (req, res) => {
    try{    
        const {id} = req.params;

        const comentarioPromise = new Promise ((resolve, reject) => {
           
           
            Comments.find({practica: {$eq: id}}, (err, comentarios) => {
                
                if(err) {
                    reject(err);
                }
                const contenidoComentario = comentarios.map(comentario => comentario.contenido);
                resolve(contenidoComentario);
            });
        });   

        const contenidos = await Promise.all([comentarioPromise]);
        practicaModel.findByIdAndUpdate(id, {comentarios: contenidos}, (err, practicas) =>{
  
            if(err){
                return res.status(400).send("ERROR: la práctica ingresada no se encuentra registrada");
            }
            return res.status(201).send(practicas)
        })
    } catch (err){
        return res.status(404).send("ERROR: ", err);
    }
}


module.exports = {addComentario}