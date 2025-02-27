const {ERROR_CODES, VALIDATION_ERROR, NOT_FOUND, FORBIDDEN, UNAUTHERISED, SERVER_ERROR} =  require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

switch (statusCode) {
    case ERROR_CODES.VALIDATION_ERROR:

    res.status(statusCode).json({
        title: "validation error",
        message: err.message,
        stackTrace: err.stack
    });
    break;

    case ERROR_CODES.NOT_FOUND:
        res.status(statusCode).json({
            title:"not found",
            message: err.message,
            stackTrace: err.stack
        });

        break;
    case ERROR_CODES.FORBIDDEN:
        res.status(statusCode).json({
            title:"forbidden",
            message: err.message,
            stackTrace: err.stack
        });

        break;
    case ERROR_CODES.UNAUTHERISED:
        res.status(statusCode).json({
            title:"unautherised",
            message: err.message,
            stackTrace: err.stack
        });


        break;
    case ERROR_CODES.SERVER_ERROR:
        res.status(statusCode).json({
            title:"server error",
            message: err.message,
            stackTrace: err.stack
        });

        break;
     default:
            console.log("no error");
        break;
            

};
}



module.exports = errorHandler;
