var express = require('express');
var router = express.Router();
router.get('/', async(req, res) => {
    res.render('index')
})
router.get('/membership', async(req, res) => {
    res.render('data_management/membership')
})

router.get('/register', async(req, res) => {
    res.render('data_management/register')
})
module.exports = router;
