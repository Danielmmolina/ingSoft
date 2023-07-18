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

    // console.log(newBrigadista.nombre,newBrigadista.apellido, newBrigadista.rut, newBrigadista.email, newBrigadista.edad, newBrigadista.telefono)

    //validaciones
    if (newBrigadista.nombre.length<3 || newBrigadista.apellido.length<3 || newBrigadista.rut.length<3 || newBrigadista.email.length<3 || newBrigadista.telefono.length<3) {
        console.log(newBrigadista)
        return res.status(400).send('ERROR: debe ingresar los datos de forma correcta');
    }
    var indexRut = newBrigadista.rut.indexOf('-');
    console.log(indexRut);

        for (let i = 0; i < indexRut; i++) {
            if (newBrigadista.rut[i]>=0 && newBrigadista.rut[i]<10) {
                continue;
            }else{
                return res.status(400).send('ERROR: Ingrese un rut valido (ej: 12345673-8)')
            }
        }
        if (newBrigadista.rut[indexRut]!=='-') {
            return res.status(400).send('ERROR: No se encuentra el guion, ingrese un rut valido (ej: 12345673-8)')
        }
        if (!(newBrigadista.rut[indexRut+1]>0 && newBrigadista.rut[indexRut+1]<10 || newBrigadista.rut[indexRut+1]=='k')) {
            return res.status(400).send('ERROR: El digito verificar es invalido, ingrese un rut valido (ej: 1234567-8)')
        }

    
    if (!newBrigadista.email.endsWith("@gmail.com")) {
        return res.status(400).send('ERROR: Ingrese un dominio valido');
    }
    if (newBrigadista.telefono.toString().length!==9 ) {
        return res.status(400).send('ERROR: Ingrese un numero valido (ej: 952345678)');
    }
    if (newBrigadista.edad<18) {
        return res.status(400).send('ERROR: El brigadista debe ser mayor a 18 años');
    }

    //hasta aqui las validaciones
    newBrigadista.save((err, brigadista) => {

        if(err){
            return res.status(400).send('ERROR: no se pudo crear el brigadista');
        }else{
            return res.status(201).send({
                status: 'success',
                brigadista
            })
        }
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
            return res.status(400).send('ERROR: no se pudo eliminar al brigadista');
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