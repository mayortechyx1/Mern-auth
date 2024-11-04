import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"

export const protect = asyncHandler(async(req, res, next)=>{
  let token;
  token = req.cookies.jwt; //get token from cookie
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) //verfies the token

      req.user = await User.findById(decoded.userId).select("-password") //gets and confirms the user from the token through id
      next()
    } catch (error) {
      console.log(error)
      throw new Error('Not authorized!, Invalid token')
      res.status(400)
    }
  } else {
    throw new Error('Not authotized!, no token')
    res.status(400)
  }
});
