// 

const express = require('express');
const { signup, login,getIssuedDocuments, viewDocument } = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', signup); // Signup route
router.post('/login', login);   
router.get('/getIssuedDocuments', getIssuedDocuments)
router.get('/viewDocument', viewDocument)

module.exports = router;
