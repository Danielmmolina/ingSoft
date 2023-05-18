//Se importa modelo practica
const practica = require('../models/practicaModel');

//Se crea controlador para crear un practica
const createPractica = (req, res) => {
    const { nombre_practica, descripcion, fecha, lugar, herramientasEquipo, cuadrilla } = req.body;
    const newPractica = new practica({
        nombre_practica,
        descripcion,
        fecha,
        lugar,
        herramientasEquipo,
        cuadrilla

    });

    const fechaActual = new Date();

    if (new Date(fecha) <= fechaActual) {
        res.status(403).send({ error: 'fecha invalida' })
    } else {
        practica.exists({ "fecha": fecha }, {"cuadrilla": cuadrilla}, (err, existe) => {
            if (existe) {
                return res.status(400).send({ message: "Un escuadron no puede hacer mas de dos practicas por dia" })
            } else {
                if (!nombre_practica) {
                    res.status(403)
                    res.send({ error: 'Nombre vacio' })
                }
                if (!descripcion) {
                    res.status(403)
                    res.send({ error: 'Descripcion vacia' })
                }
                if (!lugar) {
                    res.status(403)
                    res.send({ error: 'Lugar vacio' })
                }
                if (!herramientasEquipo) {
                    res.status(403)
                    res.send({ error: 'Equipo vacio' })
                }
                if (!cuadrilla) {
                    res.status(403)
                    res.send({ error: 'cuadrilla vacia' })
                }

                newPractica.save((err, practica) => {
                    if (err) {
                        return res.status(400).send({ message: "Error al crear la practica" })
                    }
                    return res.status(201).send(practica)
                });
            }
        })
    }
}

//se crea controlador para obtener practicas

const getPractica = (req, res) => {
    practica.find({}, (err, practica) => {
        if (err) {
            return res.status(400).send('ERROR: no se pudo obtener la practica');
        }
        const fechaActual = new Date();
        const fecha = practica.map(fechas=>fechas.fecha);
        console.log(fecha);
    console.log(fechaActual);
        return res.status(201).send(practica);
    })

}

//Se crea controlador para eliminar practica por fecha

const deletePractica = (req, res) => {
    const { fecha } = req.params;
    practica.findOneAndDelete({ fecha: fecha }, (err, practica) => {
        if (err) {
            return res.status(400).send('ERROR: no se pudo obtener la practica');
        }
        if (!practica) {
            return res.status(404).send('ERROR: practica  no encontrada');
        }
        return res.status(200).send(practica)
    })
}

//Se crea controlador para actualizar datos del practica por fecha

const updatePractica = (req, res) => {
    const { fecha } = req.params;
    practica.findOneAndUpdate({ fecha: fecha }, req.body, (err, practica) => {
        if (err) {
            return res.status(400).send('ERROR: no se pudo obtener la practica');
        }
        if (!practica) {
            return res.status(404).ssend('ERROR: practica  no encontrada')
        }
        return res.status(201).send(practica)
    })
}

module.exports = {
    createPractica,
    getPractica,
    deletePractica,
    updatePractica
}