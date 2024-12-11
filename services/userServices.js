

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const DocumentRequest = require("../models/documentrequestModel");
const Issue = require("../models/IssueModel")

const signup = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error('Email already exists');
  
  const user = new User(userData);
  await user.save();
  return generateToken(user._id);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid email or password');
  
  return generateToken(user._id);
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const createDocumentRequest = async (userId, data) => {
  const request = new DocumentRequest({
    ...data,
    userId,
    status: "pending",
  });

  return await request.save();
};

const createIssue = async (issueData) => {
  try {
    const issue = new Issue(issueData); 
    await issue.save();
    return issue;
  } catch (err) {
    console.error("Error creating issue:", err);
    throw new Error("Failed to create issue");
  }
};

const getIssuedDocuments = async (receiver) => {
  const result = await Document.find({ receiver })

  return result
}

// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
// };


module.exports = { signup, login, createDocumentRequest,createIssue,getIssuedDocuments };
