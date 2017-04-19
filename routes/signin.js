/**
 * Created by Administrator on 2017/4/18.
 */
var express = require('express');

var router = express.Router();

//验证 用户是否登录 调用匿名函数
var check = require('../middlewares/check').checkLogin();

//GET 获取posts页面 所有文章 没有必要设置消息提示中间件 即是 设置req.flash的值

router.get('/',check,function (req,res,next) {
   res.send(req.flash());
//中间件在check函数里面执行了 这里不需要向下执行中间件
});

//post 用户登录 /signin
router.post('/',check,function (req,res,next) {
    res.send(req.flash());
});

//require 得到的就是 router这个对象 然后直接执行 get post 方法
module.exports = router;