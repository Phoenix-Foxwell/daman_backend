var express = require('express');
var router = express.Router();
var RoomsController = require('../src/controllers/rooms.controller');
var authMiddleware = require('./../src/middleware/authenticate.middleware');

//auth routes Module
router.post('/get_room_list', authMiddleware.isAuthenticate, RoomsController.get_room_list);
router.post('/room_reservation', authMiddleware.isAuthenticate, RoomsController.room_reservation);
router.post('/get_room_reservation', authMiddleware.isAuthenticate, RoomsController.get_room_reservation);

module.exports = router;