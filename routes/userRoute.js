// 

const express = require('express');
const { signup, login,getIssuedDocuments,requestDocument,postIssue,viewDocument, saveuploaded, getuploadDocuments } = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);   
router.post('/getIssuedDocuments', getIssuedDocuments)
router.post('/requestDocument', requestDocument)
router.post('/postIssue', postIssue)
router.post('/viewDocument', viewDocument)
router.post('/saveupload',saveuploaded)
router.get('/getupload',getuploadDocuments)

module.exports = router;
