// 

const express = require('express');
const { signup, login,getIssuedDocuments } = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', signup); // Signup route
router.post('/login', login);   
router.get('/getIssuedDocuments', getIssuedDocuments)// Login route

module.exports = router;
