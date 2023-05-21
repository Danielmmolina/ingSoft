const Cuadrilla = require('../models/cuadrilla');
const Brigadista = require('../models/brigadista');


const createBrigadista = (req, res) => {
  const {nombre, apellido, rut, email, edad, telefono, cuadrilla } = req.body;
  const newFeedback = new Brigadista({
      nombre,
      apellido,
      rut,
      email,
      edad,
      telefono,
      cuadrilla
  });
  newFeedback.save((err, Brigadista) => {
      if(err){
          return res.status(400).send('ERROR: no se pudo crear el brigadista');
      }
      return res.status(201).send(Brigadista)
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