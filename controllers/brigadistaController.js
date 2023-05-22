const brigadista = require('../models/brigadista');

// const collect = require('collect.js');
//Se crea controlador para crear un brigadista
const createBrigadista = (req, res) => {
    const {nombre,apellido, rut, email, edad, telefono} = req.body;
    const newBrigadista = new brigadista({
        nombre,
        apellido,
        rut,
        email,
        edad,
        telefono
    });

    console.log(newBrigadista.nombre,newBrigadista.apellido, newBrigadista.rut, newBrigadista.email, newBrigadista.edad, newBrigadista.telefono)

    //validaciones
    if (newBrigadista.nombre.length<3 || newBrigadista.apellido.length<3 || newBrigadista.rut.length<3 || newBrigadista.email.length<3 || newBrigadista.edad.length<3 || newBrigadista.telefono.length<3) {
        // console.log(newBrigadista)
        for (let i = 0; i < 8; i++) {
            console.log(newBrigadista.rut[i])
            if (newBrigadista.rut[i]>=0 && newBrigadista.rut[i]<10) {
                console.log(newBrigadista.rut[i])
                continue;
            }else{
                return res.status(400).send('ERROR: El rut no debe contener puntos ni letras (ej: 12345678-9)')
            }
        }
        if (newBrigadista.rut[8]!=='-') {
            return res.status(400).send('ERROR: El debe contener un guion (ej: 12345678-9)');
        }
        if (newBrigadista.rut[9]<=0 || newBrigadista.rut[9]>10) {
            return res.status(400).send('ERROR: Verifique el digito verificador (ej: 12345678-9)');
        }

        return res.status(400).send('ERROR: debe ingresar todos los datos');
    }

    


    newBrigadista.save((err, brigadista) => {

        if(err){
            return res.status(400).send(err,'ERROR: no se pudo crear el brigadista');
        }
        return res.status(201).send(brigadista)
    });
}

//se crea controlador para obtener brigadistas

const getBrigadistas = (req, res) => {

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

            if (emailFormateado.length<1) {
                return res.status(400).send('No existe ningun brigadista');
            }

        }
        if (cantidadMatchBrigadista===0) {
            return res.status(400).send('No existe el brigadista');
        }
    })


}

const deleteBrigadista = (req, res) => {
    const {id} = req.params;
    brigadista.findByIdAndDelete(id, (err, brigadistas) => {
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
    const {id} = req.params;
    brigadista.findByIdAndUpdate(id, req.body, (err, brigadistas) => {
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
    getBrigadistas,
    getBrigadistaByInput,
    deleteBrigadista,
    updateBrigadista,
    // getByName
}