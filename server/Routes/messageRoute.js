const express = require('express')
const {sendChat,getAllMessages}  = require('../Controllers/messageController')
const router = express.Router()

router.post('/sendchat',sendChat)
router.get('/getallmsg/:senderId/:receiverId',getAllMessages)

module.exports =router