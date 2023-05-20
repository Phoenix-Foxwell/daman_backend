var express = require('express');
var router = express.Router();
var GuestsController = require('../src/controllers/guest.controller');
var authMiddleware = require('./../src/middleware/authenticate.middleware');

//auth routes Module
router.post('/add_guest', authMiddleware.isAuthenticate,GuestsController.add_guest);
router.post('/get_guest_list', authMiddleware.isAuthenticate,GuestsController.get_guest_list);
router.post('/update_guest', authMiddleware.isAuthenticate,GuestsController.update_guest);
router.post('/get_all_guest', authMiddleware.isAuthenticate,GuestsController.get_all_guest);


module.exports = router;