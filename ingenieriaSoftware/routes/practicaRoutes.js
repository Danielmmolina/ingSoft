const express = require('express');
const api = express.Router();
const practicaController = require ('../controllers/practicaController')

api.post('/practica', practicaController.crearPractica);
api.get('/practicas', practicaController.obtenerPracticas);
api.get('/practica/search/:id', practicaController.obtenerPracticaEspecifica);
api.put('/practica/update/:id', practicaController.actualizarPractica);
api.delete('/practica/delete/:id', practicaController.eliminarPractica);
