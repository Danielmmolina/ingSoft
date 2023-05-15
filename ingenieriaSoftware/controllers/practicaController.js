const practica = require('../models/practica');

const crearPractica = (req,res) => {
    const {id, nombre, fecha, descripcion, tipoPractica,localizacion,herramientas} = req.body;
    
    const newPractica = new practica({id, nombre, fecha, descripcion, tipoPractica, localizacion, herramientas});

    newPractica.save((err, practica) => {
        if (err) {
            return res.status(400).send({err: err});
        }
        return res.status(200).send(practica);
    })
};

const obtenerPracticas = (res) => {
    practica.find({},(err,practicas)=>{
        if (err) {
            return res.status(400).send({err: err});
        }
        return res.status(200).send(practicas);
    })
};
const obtenerPracticaEspecifica = (req, res) => {
    const {id} = req.params;
    practica.findById(id, req.body, (err,practica)=>{
        if (err) {
            return res.status(400).send({err: err});
        }
        return res.status(200).send(practica)
    });
};
const actualizarPractica = (req, res) => {
    const {id} = req.params;
    practica.findByIdAndUpdate(id, req.body, (err,practica) => {
        if (err) {
            return res.status(400).send({err: err});
        }
        return res.status(200).send(practica);
    });
};
const eliminarPractica = (req,res) => {
    const {id} = req.params;
    practica.findByIdAndDelete(id, (err,practica) => {
        if (err) {
            return res.status(400).send({err: err});
        }
        return res.status(200).send(practica);
    });
};

module.exports = {
    crearPractica,
    obtenerPracticas,
    obtenerPracticaEspecifica,
    actualizarPractica,
    eliminarPractica
}
