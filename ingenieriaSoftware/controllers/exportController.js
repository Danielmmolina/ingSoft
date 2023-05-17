const practica = require('../models/practicaModel');

const CsvParser = require('json2csv').Parser;

const exportPractica = async(req,res)=>{
    try {
        let practicas = [];
        var practicaData = await practica.find({});
    
        practicaData.forEach((practica) => {
          const { nombre_practica, descripcion, fecha, lugar, herramientasEquipo, escuadrilla } = practica;
          practicas.push({ nombre_practica, descripcion, fecha, lugar, herramientasEquipo, escuadrilla });
        });


        // Ordena por fecha las practicas
        practicas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
        const csvFields = ['Nombre', 'Descripcion', 'Fecha', 'Lugar', 'Herramientas', 'Escuadrilla'];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(practicas);
    
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=practicasData.csv");
    
        res.status(200).end(csvData);
    }catch(err){
        return res.status(400).send('ERROR: No se logro exportar el archivo CSV.');
    }
}

module.exports ={
    exportPractica
}