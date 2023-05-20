const express = require('express');
const api = express.Router();
const cuadrillaController = require('../controllers/cuadrillaController');

api.post('/cuadrilla', cuadrillaController.createCuadrilla);
api.get('/getCuadrilla', cuadrillaController.getCuadrilla);
api.put('/updateCuadrilla/:id', cuadrillaController.updateCuadrilla);
api.delete('/deleteCuadrilla/:id', cuadrillaController.deleteCuadrilla);

module.exports = api;

