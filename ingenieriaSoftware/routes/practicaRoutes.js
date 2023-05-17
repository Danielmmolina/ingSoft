const express = require('express');
const api = express.Router();
const practicaController = require('../controllers/practicaController');
const exportController = require('../controllers/exportController');

api.post('/practica', practicaController.createPractica);
api.get('/getpractica', practicaController.getPractica);
api.delete('/deletepractica/:fecha', practicaController.deletePractica);
api.put('/updatepractica/:fecha', practicaController.updatePractica);
api.get('/exportPractica', exportController.exportPractica);

module.exports = api;