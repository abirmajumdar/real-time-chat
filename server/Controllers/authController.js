const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const registerUser = async (req, res) => {

    const genarateToken = (id) => {
       return  jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: 30 })
    }
    try {
        console.log(req.body)
        const { email, username, password } = await req.body
        const createdUser = await User.findOne({ email })
        if (createdUser) {
            res.status(500).json({ 'message': "email already exists" })
        }
        else {
            const createdUser = await User.findOne({ username })
            if (createdUser) {
                res.status(500).json({ 'message': "username already has taken" })
            }
            else {
                const hassedPassword = await bcryptjs.hash(password, 10)
                try {
                    const createdUser = await new User({ 
                    'email':email,
                    'username':username,
                    'password':hassedPassword
                    })
                    createdUser.save()

                    // res.status(200).json({
                    //     'id': createdUser._id,
                    //     'email': createdUser.email,
                    //     'username': createdUser.username,
                    //     'password': createdUser.password,
                    //     'token': genarateToken(createdUser._id)
                    // })
                    res.status(200).json({'message':"register successfull",'User':createdUser})
                    
                }
                catch(e){
                    res.status(400).json({"message":e})
                    console.log(e)
                }
                

            }
        }
    }
    catch (err) {
        res.status(500).json({ 'message': err })
        console.log(err)
    }
}
const loginUser = async (req, res) => {
    const {email,password} = req.body 
    const exsistedUser = await User.findOne({email})
    if(!exsistedUser){
        res.status(400).json({"message":"user does't exist"})
    }
    else{
        if(await bcryptjs.compare(password,exsistedUser.password )){
            res.status(200).json({"message":"user logged",'User':exsistedUser})
        }
        else{
            res.status(400).json({"message":"password mismatched"})
        }
    }

}


// GET all users except the logged-in user
const getAllUsers=async(req,res)=>{
    try {
        const { userId } = req.params;
    
        const users = await User.find({ _id: { $ne: userId } }).select('-password'); 
        // `select('-password')` hides the password field from response
    
        res.status(200).json(users);
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}


module.exports = { registerUser, loginUser ,getAllUsers}