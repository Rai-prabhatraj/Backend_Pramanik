const express = require('express');
const {getAllDocumentRequests,getAllIssues, saveDocument,getTasks } = require('../controllers/Issuercontroller');

const issuerrouter = express.Router();

issuerrouter.post('/saveData', saveDocument); 
issuerrouter.get('/getalldocuments', getAllDocumentRequests);
issuerrouter.get('/getallissues', getAllIssues);
issuerrouter.get('/getTasks', getTasks)


module.exports = issuerrouter;
