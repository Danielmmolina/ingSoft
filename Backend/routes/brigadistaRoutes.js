const express = require('express');
const api = express.Router();
const brigadistaController = require('../controllers/brigadistaController');
const exportController = require('../controllers/exportController');

api.post('/createBrigadista', brigadistaController.createBrigadista);
api.get('/getBrigadistas', brigadistaController.getBrigadistas);
api.get('/getBrigadistaByInput', brigadistaController.getBrigadistaByInput);
// api.get('/getByName', brigadistaController.getByName);
api.delete('/deleteBrigadista/:id', brigadistaController.deleteBrigadista);
api.put('/updateBrigadista/:rut', brigadistaController.updateBrigadista);
api.get('/exportBrigadistas', exportController.exportBrigadista);


module.exports = api;