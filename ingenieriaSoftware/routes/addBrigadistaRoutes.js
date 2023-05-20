const express = require('express');
const api = express.Router();
const addBrigadista = require('../requeriments/addBrigadista');

api.get('/addBrigadista/:id', addBrigadista.addBrigadista);

module.exports = api;

