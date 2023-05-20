//Se importan los modelos a ocupar
const Brigadista = require ('../models/brigadista');
const Cuadrilla = require('../models/cuadrilla');

//Se crea requerimiento para añadir comentarios a una practica

const addBrigadista = async (req, res) => {
    try{                                           //Se ocupa try-catch para el manejo de errores
        const {id} = req.params;                   //se envia el ID de la practica por parametro

        const brigadistaPromise = new Promise ((resolve, reject) => {  //Se ocupa una promesa para obtener los comentarios que coincidan con el parametro
           
           
            Brigadista.find({cuadrilla: {$eq: id}}, (err, brigadistas) => {

                const cuadrillaID = brigadistas.map(brigadista => brigadista.cuadrilla);

                if(!cuadrillaID.includes(id)){  //En caso de que la ID no se encuentre registrada en ningun comentario, se devolverá un mensaje diciendo que la practica no tiene comentarios realizados

                    return res.status(404).send("No existe ningun brigadista para la cuadrilla ingresada");
                }
            
                if(err) {   
                    reject(err);        //En caso de algun error se ejecutará esta funcion de reject, que significa que se rechaza la promesa.
                }

                const rutBrigadista = brigadistas.map(brigadista => brigadista.rut);   //En caso de que existan, se usa la funcion .map para obtener solo el contenido de los comentarios       
                resolve(rutBrigadista);  
                
                const nombreBrigadista = brigadistas.map(brigadista => brigadista.nombre);   //En caso de que existan, se usa la funcion .map para obtener solo el contenido de los comentarios       
                resolve(nombreBrigadista)//el contenido de los comentarios se guardará como Array en la variable "contenidoComentario", y ese se devolvera. 
            });                                 //cuando se ejecuta la funcion resolve quiere decir que la promesa se resolvió sin ningún error.
        });   

        const ruts = await Promise.all([brigadistaPromise]);  //Se espera a que la promesa se resuelva y los valores encontrados se le asigna a la variable contenidos. 
       
        Cuadrilla.findByIdAndUpdate(id, {brigadistas: ruts}, (err, cuadrillas) =>{     //Una vez que se resuelve la promesa, con la misma ID enviada por parametro se filtra 
                                                                                                    //y se le añaden los comentarios correspondientes.
            if(err){
                return res.status(400).send("ERROR: la cuadrilla ingresada no se encuentra registrada"); //Si no se encuentra la ID de la práctica se enviará un error informando de la situación.
            }
          
            return res.status(201).send(cuadrillas)  
        })
   
    } catch (err){
        return res.status(404).send("Ocurrió el siguiente error: ", err);   //En caso de cualquier otro error, se ejecutará este apartado del try-catch informando del error.
    }
}

module.exports = {addBrigadista}