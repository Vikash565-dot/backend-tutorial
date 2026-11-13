class ApiError extends Error { //node js error constructor/class it is. 
    constructor(
        statusCode, 
        message = "Something went wrong",
        errors = [],
        statck = ""
    ){
        //here we r overriding things of node js error class/functionalities to customize error response
        super(message) //obv we would use super keyword to override things 
        this.statusCode = statusCode 
        this.data = null //this.data
        this.message = message 
        this.success = false
        this.errors = errors
        
        if(statck) {
            this.stack = statck
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}