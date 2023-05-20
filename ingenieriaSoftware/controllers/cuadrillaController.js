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



const createCuadrilla = (req, res) => {
    const {nombre, brigadistas, sector } = req.body;
    const newCuadrilla = new Cuadrilla({
        nombre,
        brigadistas,
        sector
    });

      
    const rut = brigadistas.rut;

    // Imprimir el valor de rut para verificar si se está obteniendo correctamente
    console.log('Valor de rut:', rut);
  
    Brigadista.findOne({ rut }, (err, brigadista) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error interno del servidor');
      }
  
      if (!brigadista) {
        console.log('Brigadista no encontrado');
        return res.status(404).send({ message: 'Usuario no registrado' });
      }
  
      if (!Array.isArray(brigadistas) || brigadistas.length < 1 || brigadistas.length > 50) {
        return res.status(400).send('ERROR: Ingrese una cantidad válida de brigadistas');
      }
  
      newCuadrilla.save((err, cuadrilla) => {
        if (err) {
          console.error(err);
          return res.status(400).send('ERROR: No es posible crear la cuadrilla');
        }
        return res.status(201).send(cuadrilla);
      });
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