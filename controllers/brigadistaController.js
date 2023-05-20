const brigadista = require('../models/brigadista');

// const collect = require('collect.js'); 
//Se crea controlador para crear un brigadista
const createBrigadista = (req, res) => {
    const {nombre, rut, email, edad, telefono, comentarios} = req.body;
    const newBrigadista = new brigadista({
        nombre,
        apellido,
        rut,
        email,
        edad,
        telefono
    });
    console.log(newBrigadista.nombre,newBrigadista.apellido, newBrigadista.rut, newBrigadista.email, newBrigadista.edad, newBrigadista.telefono)
    
    newBrigadista.save((err, brigadista) => {
        if(err){
            console.log(brigadista.nombre)
            return res.status(400).send(err,'ERROR: no se pudo crear el brigadista');
        }
        return res.status(201).send(brigadista)
    });
}

//se crea controlador para obtener brigadistas

const getBrigadista = (req, res) => {

    brigadista.find({}, (err, brigadistas) =>{
        if(err){
            return res.status(400).send('ERROR: no se pudieron obtener los brigadistas');
        }
        return res.status(201).send(brigadistas);
    })

}

const getBrigadistaByInput = (req,res) =>{
    const {inputEmail} = req.body;
    console.log(inputEmail);

    const buscarEmail = inputEmail.trim().length;
    console.log(buscarEmail);

    let cantidadMatchBrigadista= 0;

    console.log('brigadista.email',brigadista.email)

    brigadista.find({}, (err, brigadistas) =>{
        const emails = brigadistas.map(brigadista => brigadista.email)
        console.log(emails)

        for (let i = 0; i < emails.length; i++) {

            const emailFormateado = emails[i].toLowerCase().trim();
            console.log("email formateado",emailFormateado)
            
            if (emailFormateado===inputEmail.toLowerCase().trim()) {
                console.log('match!!!')

                cantidadMatchBrigadista++;

                console.log("Email a buscar: ", inputEmail)
                
                const foundByEmail = brigadistas.find(brigadistaMatch => brigadistaMatch.email===inputEmail)
                console.log("EMAIL FOUND!!!! :D ",foundByEmail)
                return res.status(201).send(foundByEmail);
            }

            if (cantidadMatchBrigadista===0) {
                return res.status(400).send('No existe el brigadista');
            }
            if (emailFormateado.length<1) {
                return res.status(400).send('No existe ningun brigadista');
            }

        }
    })


}



const deleteBrigadista = (req, res) => {
    const {rut} = req.params;
    brigadista.findOneAndDelete ({rut:{ $eq: rut}}, (err, brigadistas) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener al brigadista');
        }
        if(!brigadistas){
            return res.status(404).send('ERROR: brigadista  no encontrado');
        }
        return res.status(200).send(brigadistas)
    })
}

//Se crea controlador para actualizar datos del brigadista por rut

const updateBrigadista = (req, res) => {
    const {rut} = req.params; 
    brigadista.findOneAndUpdate({rut :{ $eq: rut}}, req.body, (err, brigadistas) => {
        if(err){
            return res.status(400).send('ERROR: no se pudo obtener al brigadista');
        }
        if(!brigadistas){
            return res.status(404).send('ERROR: brigadista  no encontrado');
        }

        return res.status(201).send(brigadistas)
    })
}

module.exports ={
    createBrigadista,
    getBrigadista,
    getBrigadistaByInput,
    deleteBrigadista,
    updateBrigadista,
    // getByName
}