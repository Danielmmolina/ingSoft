//Se importa modelo Brigadista
const Brigadista = require('../models/brigadista');

//Se crea controlador para crear un brigadista
const createBrigadista = (req, res) => {
    const {nombre, apellido, rut, email, edad, telefono, comentarios} = req.body;
    const newBrigadista = new Brigadista({
        nombre,
        apellido,
        rut,
        email,
        edad,
        telefono,
    });
    newBrigadista.save((err, Brigadista) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo crear el brigadista');
        }
        return res.status(201).send(Brigadista)
    });
}

//se crea controlador para obtener brigadistas

const getBrigadista = (req, res) => {
    Brigadista.find({}, (err, brigadistas) =>{
        if(err){
            return res.status(400).send('ERROR: no se pudieron obtener los brigadistas');
        }
    
        return res.status(201).send(brigadistas);
    })    
}

const deleteBrigadista = (req, res) => {
    const {rut} = req.params;
    Brigadista.findOneAndDelete ({rut:{ $eq: rut}}, (err, brigadistas) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener al brigadista');
        }
        if(!brigadistas){
            return res.status(404).send('ERROR: brigadista  no encontrado');
        }
        return res.status(200).send(brigadistas)
    })
}

//Se crea controlador para actualizar datos del brigadista por rut

const updateBrigadista = (req, res) => {
    const {rut} = req.params; 
    Brigadista.findOneAndUpdate({rut :{ $eq: rut}}, req.body, (err, brigadistas) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener al brigadista');
        }
        if(!brigadistas){
            return res.status(404).send('ERROR: brigadista  no encontrado');
        }

        return res.status(201).send(brigadistas)
    })
}

module.exports ={
    createBrigadista,
    getBrigadista,
    deleteBrigadista,
    updateBrigadista
}