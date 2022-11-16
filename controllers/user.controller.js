const { Validator } = require('node-input-validator');

const user = require('./../models/user.model')
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
exports.register= async (req, res)=>{

    const v = new Validator(req.body, {
        Username: 'required|minLength:2|maxLength:100',
        email: 'required|email|unique:User,email',
        password: 'required'
     });

    const matched= await v.check();

    if(!matched) {
        return res.status(422).send(v.errors);
    }

    try{
        const newUser = new user({
            Username: req.body.Username,
            email: req.body.email,
            password: req.body.password
        });

        let userData= await newUser.save();

        return res.status(200).send({
            message:'registration success',
            data: userData
        });
    } catch(err) {
        return res.status(400).send({
            message:err.message,
            data: err
        }); 
    }
}

exports.login= async (req, res)=> {
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
     }); 

     const matched= await v.check();

     if(!matched) {
        return res.status(422).send(v.errors);
    }

    try {
        let userData= await user.findOne({email:req.body.email});
        if(userData){
            
            if(bcrypt.compareSync(req.body.password, userData.password)){

                let jwt_secret=process.env.JWT_SECRET||'mysecret';
                let token = jwt.sign({
                    data: userData
                }, jwt_secret, { expiresIn: '12h' });

                return res.status(200).send({
                    message:'login success',
                    data: userData,
                    token:token
                });

            }else{
                return res.status(400).send({
                    message:'incorrect credentials',
                    data: {}
                });    
            }

        }else{
            return res.status(400).send({
                message:'User is not Registered',
                data: userData
            });    
        }
    } catch(err){
        return res.status(400).send({
            message:err.message,
            data: err
        });
    }
}