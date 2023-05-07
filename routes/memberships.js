var express = require('express');
var router = express.Router();
var MembershipController = require('../src/controllers/membership.controller');
var authMiddleware = require('./../src/middleware/authenticate.middleware');

//auth routes Module
router.post('/get_membership_types', MembershipController.get_membership_types);

module.exports = router;