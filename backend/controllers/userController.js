import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
export const registerUser = asyncHandler(async(req, res, next)=>{
  const {name, email, password} = req.body
  console.log(req.body)

  // check for the inputs
  if (!name || !password || !email) {
    const error = new Error('please enter all fields')
    res.status(400)
    return next(error)
  }

  // check if a user with the email exists already
  const userExists = await User.findOne({email})

  if(userExists) {
    const error = new Error(`a user with ${email} exits already`)
    res.status(400)
    return next(error)
  }

  // normally we are supposed to hash password here, but we would do it in userModel

  // we create user in the database
  const user = await User.create({
    name, email, password
  }) 
  
  // check if the user is created
  if(user) {
    generateToken(res, user.id)
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } else{
    const error = new Error(`invalid user details`)
    res.status(400)
    return next(error)
  }
})

// @desc    Auth user / set token
// @route   POST /api/users/auth
// @access  Public
export const authUser = asyncHandler(async(req, res, next)=>{
  const {email, password} = req.body;

  // check for the input
  if (!password || !email) {
    const error = new Error('please enter all fields')
    res.status(400)
    return next(error)
  }

  // check if the user is registered
  const user = await User.findOne({email});

  if (user && await user.isPasswordCorrect(password)) {
    generateToken(res, user.id)
    res.status(200).json({
      name : user.name, email
    })
  } else{
    const error = new Error('invalid email or password')
    res.status(401)
    return next(error)
  }
  // res.status(200).json({msg: "authUser"})
})

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async(req, res, next)=>{
  // destroy the cookie that contains the jwt token
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({msg: "User logged out"})
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async(req, res, next)=>{
  const user = {
    _id: req.user.id, 
    name: req.user.name,
    email: req.user.email
  }  
  res.status(200).json(user)
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async(req, res, next)=>{
  const user = await User.findById(req.user.id);

  // the user has been checked in authmiddleware, but we'll check again just for formalites
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    // we checked the password differently to prevent unneccessary hashing if it doesn't change
    if (req.body.password) {
      user.password = req.body.password
    }

    // get the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})