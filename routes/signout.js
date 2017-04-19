/**
 * Created by Administrator on 2017/4/18.
 */
var express = require('express');
var router = express.Router();

var check = require('../middlewares/check').checkLogin();

//GET 登出操作
router.use('/',check,function (req,res,next) {
    res.send();
});

module.exports = router;