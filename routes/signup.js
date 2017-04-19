/**
 * Created by Administrator on 2017/4/18.
 */
var express = require('express');
var router = express.Router();

var check = require('../middlewares/check').checkLogin();

//注册 使用中间件确定注册没有 如果 req.session.user 不为空则已注册
//get/post
router.use('/',check,function (req,res,next) {
    res.send(req.flash());//直接发送 消息提示的中间件 req.flash
});

module.exports = router;