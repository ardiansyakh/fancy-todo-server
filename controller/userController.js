const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    static signUp(req, res, next){
        const {email, password} = req.body
        
        User.create({email, password})
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static signIn(req, res, next){
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(result=>{
            const compare = bcrypt.compareSync(password, result.password)
            if(compare){
                const payload = {
                    user_id: result.id
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json({message: 'Login Success', access_token})
            }else{
                throw{name: 'LOGIN_FAILED'}
            }
        })
        .catch(err=>{
            next({name: 'LOGIN_FAILED'})
        })
    }
}

module.exports = UserController