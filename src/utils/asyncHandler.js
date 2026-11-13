const asyncHandler = (requestHandler) => { //requesthandler is just a fn name, same as 'fn' in below example code.
    (req,res,next ) => {
        promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}


export {asyncHandler}

// const asyncHnadler = (fn) => async (req, res, next) => {
// // higher order function which takes a function as an argument and returns a new function that wraps the original function in a try-catch block. This allows for easier error handling in asynchronous functions. 

// //kinda same as -- const func = (func)=> {()=> {}}
//     try{
//         await fn(req,res,next)
//     }
//     catch(erorr) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }


// } 