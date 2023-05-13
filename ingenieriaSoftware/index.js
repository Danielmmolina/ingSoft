const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

//Conexión a base de datos

mongoose.connect(process.env.DB,(error) =>{
    if(error){
        console.log(error);
    }else{
        console.log("Conectado en la base de datos");
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server iniciado en el puerto: ${process.env.PORT}`);
})