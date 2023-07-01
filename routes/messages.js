var express = require('express');
var router = express.Router();
var MessageController = require('../src/controllers/messages.controller');
var authMiddleware = require('./../src/middleware/authenticate.middleware');

//auth routes Module
router.post('/get_messages', authMiddleware.isAuthenticate,MessageController.get_messages);
router.post('/get_message_list',MessageController.get_message_list);
router.post('/get_messages_for_manager',MessageController.get_messages_for_manager);



module.exports = router;