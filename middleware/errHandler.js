const errHandler = (err, req, res, next)=>{
    let statusCode
    let errorMessage
    switch(err.name){
        case'TODO_NOT_FOUND' : 
            statusCode = 404
            errorMessage = {message: "Todo Not Found"}
            break
        case'USER_NOT_FOUND' : 
            statusCode = 404
            errorMessage = {message: "User Not Found"}
            break
        case'SequelizeValidationError' : 
            statusCode = 400
            errorMessage = {message: err.errors[0].message}
            break
        case'SequelizeUniqueConstraintError' : 
            statusCode = 400
            errorMessage = {message: 'Email already registered'}
            break
        case'LOGIN_FAILED' : 
            statusCode = 401
            errorMessage = {message: 'Invalid email/password'}
            break
        case'NOT_LOGIN' : 
            statusCode = 401
            errorMessage = {message: 'Please SignIn First'}
            break
        case'INVALID_TOKEN' : 
            statusCode = 401
            errorMessage = {message: 'Invalid Access Token'}
            break
        case'INVALID_OTP' : 
            statusCode = 401
            errorMessage = {message: 'Invalid OTP'}
            break 
        default :
            statusCode = 500
            errorMessage = {message: err}
            break
    }

    res.status(statusCode).json(errorMessage)
}

module.exports = errHandler