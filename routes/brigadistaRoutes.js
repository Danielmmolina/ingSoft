const express = require('express');
const api = express.Router();
const brigadistaController = require('../controllers/brigadistaController');

api.post('/brigadista', brigadistaController.createBrigadista);
api.get('/getBrigadista', brigadistaController.getBrigadista);
api.get('/getBrigadistaByInput', brigadistaController.getBrigadistaByInput);
// api.get('/getByName', brigadistaController.getByName);
api.delete('/deleteBrigadista/:rut', brigadistaController.deleteBrigadista);
api.put('/updateBrigadista/:rut', brigadistaController.updateBrigadista);

module.exports = api;