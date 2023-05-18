const express = require('express');
const api = express.Router();
const requirements = require('../requirements/addComments');


api.get('/addComentario/:id', requirements.addComentario);

module.exports = api;