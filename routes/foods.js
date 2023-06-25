
var express = require('express');
var router = express.Router();
var FoodsController = require('../src/controllers/foods.controller');
var authMiddleware = require('./../src/middleware/authenticate.middleware');

//auth routes Module
router.post('/get_categories',authMiddleware.isAuthenticate,FoodsController.get_categories);
router.post('/get_items',authMiddleware.isAuthenticate,FoodsController.get_items);
router.post('/get_all_items',authMiddleware.isAuthenticate,FoodsController.get_all_items);

router.post('/update_item_status',authMiddleware.isAuthenticate,FoodsController.update_item_status);
router.post('/create_order',authMiddleware.isAuthenticate,FoodsController.create_order);
router.post('/get_order',authMiddleware.isAuthenticate,FoodsController.get_order);
router.post('/get_all_order',authMiddleware.isAuthenticate,FoodsController.get_all_order);

module.exports = router;