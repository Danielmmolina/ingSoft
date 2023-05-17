const express = require('express');
const api = express.Router();
const practicaController = require('../controllers/practicaController');

api.post('/practica', practicaController.createPractica);
api.get('/getpractica', practicaController.getPractica);
api.delete('/deletepractica/:fecha', practicaController.deletePractica);
api.put('/updatepractica/:fecha', practicaController.updatePractica);

module.exports = api;
