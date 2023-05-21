const Cuadrilla = require('../models/cuadrilla');
const Brigadista = require('../models/brigadista');

/**const rutBrigadistaa = async(req,res)=>{
        let brigadistas = [];
        var brigadistaData = await Brigadista.find({});
    
        brigadistaData.forEach((Brigadista) => {
          const { rut} = Brigadista;
          brigadistas.push({  rut });
        
            return Brigadista
        });
    }  */



    const createCuadrilla = async (req, res) => {
      const { nombre, brigadistas, sector } = req.body;
    
      if (!Array.isArray(brigadistas)) {
        return res.status(400).send('ERROR: brigadistas debe ser un array');
      }
    
      let brigadistasData = [];
      const brigadistaData = await Brigadista.find({});
    
      brigadistaData.forEach((brigadista) => {
        const { rut } = brigadista;
        brigadistasData.push({ rut });
      });
    
      const rutsBrigadistas = brigadistas.map((brigadista) => brigadista.rut);
    
      const invalidBrigadistas = rutsBrigadistas.filter((rut) => !brigadistasData.find((brigadista) => brigadista.rut === rut));
    
      if (invalidBrigadistas.length > 0) {
        return res.status(400).send('ERROR: algunos brigadistas no existen en la base de datos');
      }
    
      const brigadistasIds = brigadistaData.filter((brigadista) => rutsBrigadistas.includes(brigadista.rut)).map((brigadista) => brigadista._id);
    
      const newCuadrilla = new Cuadrilla({
        nombre,
        brigadistas: brigadistasIds,
        sector,
      });
    
      newCuadrilla.save((err, cuadrilla) => {
        if (err) {
          return res.status(400).send('ERROR: no se pudo crear la cuadrilla');
        }
        return res.status(201).send(cuadrilla);
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