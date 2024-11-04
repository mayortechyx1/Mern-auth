import express from 'express';
import cookieParser from 'cookie-parser';
import colors from 'colors' //used in the db.js file
import userRoute from './routes/userRoute.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'
import path from "path";
const port = process.env.PORT

// connect database
connectDB()

// initialize the app
const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cookie-parser
app.use(cookieParser())

// routes
app.use('/api/users', userRoute)

if (process.env.NODE_ENV==="production") {
  const __dirname = path.resolve(); //gets the current working directory
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // app.use('*', (req, res) =>  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")))
}else {
  app.use('/', (req, res) => res.send("server is ready"))
}

// error middleware
app.use(notFound)
app.use(errorHandler)

// start the server
app.listen(port, ()=>console.log(`Server connected successfully on port: ${port}`))