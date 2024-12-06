const express = require('express');
const {saveData } = require('../controllers/Issuercontroller');

const issuerrouter = express.Router();

issuerrouter.post('/saveData', saveData); 

module.exports = issuerrouter;
