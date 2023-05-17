const practica = require('../models/practicaModel');
const Brigadista = require('../models/brigadista');

const CsvParser = require('json2csv').Parser;

// Controlador para exportar practicas

const exportPractica = async(req,res)=>{
    try {
        let practicas = [];
        var practicaData = await practica.find({});
    
        
        // Busca los datos necesarios en la BD y los añade en el array practicas
        practicaData.forEach((practica) => {
          const { nombre_practica, descripcion, fecha, lugar, herramientasEquipo, escuadrilla } = practica;
          practicas.push({ nombre_practica, descripcion, fecha, lugar, herramientasEquipo, escuadrilla });
        });


        // Ordena por fecha las practicas
        practicas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
        // Se ordenan los datos por columnas
        const fields = [
            { label: 'Nombre', value: 'nombre_practica' },
            { label: 'Descripcion', value: 'descripcion' },
            { label: 'Fecha', value: 'fecha' },
            { label: 'Lugar', value: 'lugar' },
            { label: 'Herramientas', value: 'herramientasEquipo' },
            { label: 'Cuadrilla', value: 'escuadrilla' }
          ];
        const csvParser = new CsvParser({ fields, delimiter: ';'  });
       
       // Aqui se convierte el archivo JSON a CSV
        const csvData = csvParser.parse(practicas);
        
    
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader("Content-Disposition", "attachment; filename=practicasData.csv");
    
        res.status(200).end(csvData);
    }catch(err){
        console.error(err); // Agregar un console.log para mostrar el error en la consola
        return res.status(500).send('ERROR: No se logro exportar el archivo');
    }
}

// Controlador para exportar brigadistas

const exportBrigadista = async(req,res)=>{
    try {
        let brigadistas = [];
        var brigadistaData = await Brigadista.find({});
    
        brigadistaData.forEach((Brigadista) => {
          const { nombre, apellido, rut, email, edad, telefono } = Brigadista;
          brigadistas.push({ nombre, apellido, rut, email, edad, telefono });
        });

        // Ordena los apellidos alfabeticamente
        
        brigadistas.sort((a, b) => {
            const apellidoA = a.apellido.toLowerCase();
            const apellidoB = b.apellido.toLowerCase();
          
            return apellidoA.localeCompare(apellidoB);
          });

        const fields = [
            { label: 'Nombre', value: 'nombre' },
            { label: 'Apellido', value: 'apellido' },
            { label: 'Rut', value: 'rut' },
            { label: 'Email', value: 'email' },
            { label: 'Edad', value: 'edad' },
            { label: 'Telefono', value: 'telefono' }
          ];
        const csvParser = new CsvParser({ fields, delimiter: ';'  });
        const csvData = csvParser.parse(brigadistas);
        
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=brigadistaData.csv");
    
        res.status(200).end(csvData);

    }catch(err){

        console.error(err); // Agregar un console.log para mostrar el error en la consola
        return res.status(500).send('ERROR: No se logro exportar el archivo');
    }
}

module.exports ={
    exportPractica,
    exportBrigadista
}