const express = require('express')
const {registerUser,loginUser,getAllUsers} = require('../Controllers/authController')
const router = express.Router()

router.get('/getusers/:userId',getAllUsers)
router.post('/register',registerUser)
router.post('/login',loginUser)

module.exports = router
