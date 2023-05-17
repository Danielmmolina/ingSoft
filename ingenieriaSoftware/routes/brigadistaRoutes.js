const express = require('express');
const api = express.Router();
const brigadistaController = require('../controllers/brigadistaController');
const exportController = require('../controllers/exportController');

api.post('/brigadista', brigadistaController.createBrigadista);
api.get('/getBrigadista', brigadistaController.getBrigadista);
api.delete('/deleteBrigadista/:rut', brigadistaController.deleteBrigadista);
api.put('/updateBrigadista/:rut', brigadistaController.updateBrigadista);
api.get('/exportBrigadista', exportController.exportBrigadista);

module.exports = api;