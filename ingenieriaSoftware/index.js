const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();


dotenv.config();

const feedbackRoutes = require('./routes/feedbackRoutes');
const brigadistaRoutes = require('./routes/brigadistaRoutes');
const practicaRoutes = require('./routes/practicaRoutes');
const cuadrillaRoutes = require('./routes/cuadrillaRoutes');
const addBrigadistaRoutes = require('./routes/addBrigadistaRoutes');
//Conexión a base de datos

mongoose.connect(process.env.DB,(error) =>{
    if(error){
        console.log(error);
    }else{
        console.log("Conectado en la base de datos");
    }
});


//Llamado de rutas
app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/api',feedbackRoutes);
app.use('/api', brigadistaRoutes);
app.use('/api', practicaRoutes);
app.use('/api', cuadrillaRoutes);
app.use('/api', addBrigadistaRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server iniciado en el puerto: ${process.env.PORT}`);
})