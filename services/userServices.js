// const userModel = require("../models/UserModel")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const app_constant = require("../constants/app.json")
// require("dotenv").config()


// exports.userSignup = async (data) => {
//      const {email, user_name, password } = data

//      const user_data = await userModel.findOne({email})

//      if (user_data) {
//         return {
//             success: 0,
//             status: app_constant.BAD_REQUEST,
//             message: "Email Already Exists",
//             result: {},
//         }
//     }

//     const salt = await bcrypt.genSalt(10)
//     const hashPassword = await bcrypt.hash(password, salt)

//     const addUser = await userModel.create({ ...data, password: hashPassword })
//     return {
//         success: 1,
//         status: app_constant.SUCCESS,
//         message: "user added successfully",
//         result: addUser,
//     }


// }

// exports.userLogin = async (data) => {
//     const {email, password} = data

//     const userData = await userModel.findOne({email})

//     if (!userData) {
//         return {
//             success: 0,
//             status: app_constant.BAD_REQUEST,
//             message: "Email does not exist!",
//             result: {},
//         };
//     }

//     const password_check = await bcrypt.compare(password, userData.password)

//     if (!password_check) {
//         return {
//             success : 0,
//             status : app_constant.BAD_REQUEST,
//             message: "Enter valid Credentials",
//             result : {}
//         }
//     }

//     const token = jwt.sign({id : userData._id}, process.env.JWT_SECRET_KEY)

//     const res = await userModel.updateOne({_id : userData._id}, {$set:  {token}})

//     return {
//         success: 1,
//         status: app_constant.SUCCESS,
//         message: "user loggedin successfully",
//         result: userData,
//         token : token
//     }
// }

// exports.userLogout = async (userData) => {
//     const res = await userModel.updateOne({_id : userData._id}, {$set:  {token: ''}})

//     return {
//         success: 1,
//         status: app_constant.SUCCESS,
//         message: "user logout successfully",
//         result: userData
//     }
// }


const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

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

module.exports = { signup, login };
