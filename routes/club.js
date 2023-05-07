var express = require('express');
var router = express.Router();
var ClubController  = require('../src/controllers/club.controller');
var authMiddleware = require('./../src/middleware/authenticate.middleware');

//auth routes Module
router.get('/get_club_activity', authMiddleware.isAuthenticate,ClubController.get_club_activity);

module.exports = router;