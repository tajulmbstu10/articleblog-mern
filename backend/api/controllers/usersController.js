const UsersModel = require('../model/UsersModel')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


// Get All user login data
const registerController = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, (err, hash)=> {
        if(err){
            res.json({
                message:'error occured',
                error:err
            })
        }

        let user = new UsersModel({
            email:req.body.email,
            password:hash
        })

        user.save()
        .then(result=>{
            res.status(201).json({
                message:'Registration Successfull',
                user:result
            })
        })
        .catch(err=>{
            res.json({
                message:'error occured',
                error: err
            })
        })
        // ---- check hash generate or not
        // res.json({
        //     hash,
        //     original:req.body.password
        // })
        // -----
    });


}

const getAllUser = (req, res, next) => {
    UsersModel.find()
    .then(users=>{
        if(!users){
            res.status(404).end()
        }
        res.json({
            users
        })
    })
    .catch(err=>{
        res.json({
            message:"error occured",
            error: err
        })
    })
}

const logInController = (req, res, next)=>{
    let email= req.body.email
    let password = req.body.password

    UsersModel.findOne({email})
    .then(user => {
        if(user){
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, (err, result)=> {
                if(err){
                    res.json({
                        message:"error occured",
                        error:err
                    })
                }
                if(result){
                    const token = jwt.sign({email:user.email, _id:user._id},'SECRET',{ expiresIn: '2h' })
                    res.json({
                        message:"login Successfull",
                        token
                    })
                }else{
                    res.json({
                        message:"Login failed. Password does not matched"
                    })
                }
            });
        }else{
            res.json({
                message:"Login Failed. User not found"
            })
        }
    })
    .catch(err=>{
        res.json({
            error:"error occured",
            error:err
        })
    })

}

module.exports = {
    registerController,
    getAllUser,
    logInController
}