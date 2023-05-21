const Cuadrilla = require('../models/cuadrilla');
const Brigadista = require('../models/brigadista');


const createCuadrilla = (req, res) => {
  const {nombre, brigadistas, sector } = req.body;
  const newFeedback = new Cuadrilla({
      nombre,
      brigadistas,
      sector
  });
  newFeedback.save((err, Cuadrilla) => {
      if(err){
          return res.status(400).send('ERROR: no se pudo crear el brigadista');
      }
      return res.status(201).send(Cuadrilla)
  });
}

const getCuadrilla = (req, res) => {
    Cuadrilla.find({}, (err, cuadrillas) =>{
        if(err){
            return res.status(400).send('ERROR: no fue posible obtener las cuadrillas');
        }
        return res.status(201).send(cuadrillas);
    })    
}

const updateCuadrilla = (req, res) => {
    const {id} = req.params;
    Cuadrilla.findByIdAndUpdate(id, {$push: {brigadistas:req.body.brigadistas}}, (err, Cuadrilla) => {
        if(err){
            return res.status(400).send({ message: "Error al obtener cuadrilla"})
        }
        if(!Cuadrilla){
            return res.status(404).send({ message:  "Cuadrilla no encontrada"})
        }
        return res.status(200).send(Cuadrilla)
    });
    
}

const deleteCuadrilla = (req, res) => {
    const {id} = req.params;
    espacioComunModel.findByIdAndDelete(id ,(err, Cuadrilla) => {
        if(err){
            return res.status(400).send({ message: "Error al obtener cuadrilla"})
        }
        if(!Cuadrilla){
            return res.status(404).send({ message:  "Cuadrilla no encontrada"})
        }
        return res.status(200).send(Cuadrilla)
    });
    
}




module.exports ={
    createCuadrilla,
    getCuadrilla,
    deleteCuadrilla,
    updateCuadrilla
}