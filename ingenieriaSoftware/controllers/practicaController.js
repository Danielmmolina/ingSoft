//Se importa modelo practica
const practica = require('../models/practicaModel');

//Se crea controlador para crear un practica
const createPractica = (req, res) => {
    const {nombre_practica, descripcion, fecha, lugar, herramientasEquipo, escuadrilla} = req.body;
    const newPractica = new practica({
        nombre_practica,
        descripcion,
        fecha,
        lugar,
        herramientasEquipo,
        escuadrilla

    });
    newPractica.save((err, practica) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo crear el practica');
        }
        return res.status(201).send(practica)
    });


practica.exists({"fecha": fecha}, (err, existe) => {
    const fechaActual = new Date();
    if(existe){
        return res.status(400).send({message: "Ya existe una practica con esa fecha"})
    }else {
        if(!nombre_practica){
            res.status(403)
            res.send({error: 'Nombre vacio'})
        }
        if(!descripcion){
            res.status(403)
            res.send({error: 'Descripcion vacia'})
        }
        if(!lugar){
            res.status(403)
            res.send({error: 'Lugar vacio'})
        }
        if(!herramientasEquipo){
            res.status(403)
            res.send({error: 'Equipo vacio'})
        }
        if(!escuadrilla){
            res.status(403)
            res.send({error: 'Escuadrilla vacia'})
        }
        if(!fecha || req.body.fecha <= fechaActual){
            res.status(403)
            res.send({error: 'fecha invalida'})
        }else  {
    newPractica.save((err, practica) => {
        if (err) {
            return res.status(400).send({message:"Error al crear la practica"})
        }
        return res.status(201).send(practica)
                });
            }
        }
    })

}

//se crea controlador para obtener practicas

const getPractica = (req, res) => {
    practica.find({}, (err, practica) =>{
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener la practica');
        }
        return res.status(201).send(practica);
    })    
}

//Se crea controlador para eliminar practica por fecha

const deletePractica = (req, res) => {
    const {fecha} = req.params;
    practica.findOneAndDelete({fecha: fecha}, (err, practica) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener la practica');
        }
        if(!practica){
            return res.status(404).send('ERROR: practica  no encontrada');
        }
        return res.status(200).send(practica)
    })
}

//Se crea controlador para actualizar datos del practica por fecha

const updatePractica= (req, res) => {
    const {fecha} = req.params; 
    practica.findOneAndUpdate({fecha : fecha}, req.body, (err, practica) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener la practica');
        }
        if(!practica){
            return res.status(404).ssend('ERROR: practica  no encontrada')
        }
        return res.status(201).send(practica)
    })
}

module.exports ={
    createPractica,
    getPractica,
    deletePractica,
    updatePractica
}