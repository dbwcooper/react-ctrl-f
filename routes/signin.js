/**
 * Created by Administrator on 2017/4/18.
 */
var express = require('express');

var router = express.Router();
var sha1 = require('sha1');

var checkNotLogin = require('../middlewares/check').checkNotLogin;
var UserModel = require('../models/users');

//GET 获取posts页面 所有文章 没有必要设置消息提示中间件 即是 设置req.flash的值

router.get('/',function (req,res,next) {
    res.render('signin');
//中间件在check函数里面执行了 这里不需要向下执行中间件
});

//post 用户登录 /signin
router.post('/',checkNotLogin,function (req,res,next) {
    var name = req.fields.name;
    var pwd = req.fields.password;
    UserModel.getUserByName(name)
        .then(function (user) {
            if(!user){
                req.flash('error','用户不存在');
                return res.redirect('back');
            }
            //检查密码是否匹配
            if(sha1(pwd) !== user.password){
                req.flash('error','用户名或密码错误!');
                return res.redirect('back');
            }
            req.flash('success','登录成功');
        //    用户信息写入 session
            delete user.password;
            req.session.user = user;
        //    跳转到主页
            res.redirect('/posts');
        })
        .catch(next);

});

//require 得到的就是 router这个对象 然后直接执行 get post 方法
module.exports = router;