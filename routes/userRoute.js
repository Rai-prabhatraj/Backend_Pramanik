// 

const express = require('express');
const { signup, login,getIssuedDocuments,requestDocument,postIssue,viewDocument } = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);   
router.get('/getIssuedDocuments', getIssuedDocuments)
router.post('/requestDocument', requestDocument)
router.post('/postIssue', postIssue)
router.get('/viewDocument', viewDocument)

module.exports = router;
