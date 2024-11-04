export const errorHandler = (err, req, res, next)=>{
  let status = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if(err.name === "CastError" && err.kind === "ObjectId") {
    status = 404
    message = "Resource not found"
  }

  res.status(status).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
}

export const notFound = (req, res, next)=>{
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  return next(error)
}
// const errorHandler = (err, req, res, next)=>{
//   const status = res.statusCode? res.statusCode : 500;
//   res.status(status).json({
//     message: err.message,
//     stack: process.env.NODE_ENv === "production"? null : err.stack
//   }); 
// };

// const notFound = (req, res, next)=>{
//   const error = new Error(`endpoint not found`);
//   res.statusCode = 404;
//   next(error);
// };
