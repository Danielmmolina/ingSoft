const Cuadrilla = require('../models/cuadrilla');
const Brigadista = require('../models/brigadista');

const createCuadrilla = async (req, res) => {
  const { nombre, brigadistas, sector } = req.body;

  // Validar el nombre de la cuadrilla
  if (!nombre || nombre.length < 3) {
    return res.status(400).send('ERROR: El nombre de la cuadrilla debe tener al menos 3 caracteres');
  }

  // Verificar si ya existe una cuadrilla con el mismo nombre
  const existingCuadrilla = await Cuadrilla.findOne({ nombre: nombre });
  if (existingCuadrilla) {
    return res.status(400).send(`ERROR: Ya existe una cuadrilla con el nombre ${nombre}`);
  }

  // Validar el número de brigadistas
  if (!brigadistas || brigadistas.length < 1 || brigadistas.length > 50) {
    return res.status(400).send('ERROR: Debe añadirse al menos un brigadista y máximo 50');
  }

  // Verificar si los brigadistas están en la base de datos
  for (const rut of brigadistas) {
    const brigadista = await Brigadista.findOne({ rut: rut });
    if (!brigadista) {
      // El brigadista no está en la base de datos
      return res.status(400).send(`ERROR: El brigadista con RUT ${rut} no existe en la base de datos`);
    }
  }

  // Los brigadistas están en la base de datos, continuar con la creación de la cuadrilla
  const newCuadrilla = new Cuadrilla({ nombre, brigadistas, sector });
  newCuadrilla.save((err, Cuadrilla) => {
    if (err) {
      return res.status(400).send('ERROR: no se pudo crear el brigadista');
    }
    return res.status(201).send(Cuadrilla);
  });
};


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