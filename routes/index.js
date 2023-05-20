var express = require('express');
var router = express.Router();
var authValidate = require('./validation/index')
var authMiddleware = require('./../src/middleware/authenticate.middleware');
var UsersController = require('../src/controllers/user.controller');
//auth routes Module
router.post('/admin/send_otp',UsersController.send_otp)
router.post('/admin/verify_otp',UsersController.verify_otp)
router.post('/admin/register_user',UsersController.register_user)
router.post('/admin/get_wallet_amount',authMiddleware.isAuthenticate,UsersController.get_wallet_amount)
router.post('/admin/update_wallet_amount',authMiddleware.isAuthenticate,UsersController.update_wallet_amount)
router.post('/admin/get_wallet_history',authMiddleware.isAuthenticate,UsersController.get_wallet_history)
router.post('/admin/get_all_active_users',authMiddleware.isAuthenticate,UsersController.get_all_active_users)
router.post('/admin/get_requested_users',authMiddleware.isAuthenticate,UsersController.get_requested_users)


// router.get('/', async(req, res) => {
//     if(req.session.loggedin){
//         res.render('data_management/list',{token:req.session.token, role:req.session.role, fullname:req.session.fullname})
    
//     }
//     res.render('templates/login')
    
// })

 
module.exports = router;