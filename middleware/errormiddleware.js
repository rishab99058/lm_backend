class ErrorMiddleware extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorMiddleware(message, 400);
    }

    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorMiddleware(message, 400);
    }
    
    if(err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, try again`;
        err = new ErrorMiddleware(message, 400);
    }

    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}: ${err.value}`;
        err = new ErrorMiddleware(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}

export default ErrorMiddleware;