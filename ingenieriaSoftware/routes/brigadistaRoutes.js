const express = require('express');
const api = express.Router();
const brigadistaController = require('../controllers/brigadistaController.js');

api.post('/brigadista', brigadistaController.createBrigadista);
api.get('/getBrigadista', brigadistaController.getBrigadista);
api.delete('/deleteBrigadista/:rut', brigadistaController.deleteBrigadista);
api.put('/updateBrigadista/:rut', brigadistaController.updateBrigadista);

module.exports = api;