/**
 * Created by Administrator on 2017/4/18.
 */
var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;


var fs = require('fs');
var sha1 = require('sha1');
var path = require('path');
var express = require('express');
var UserModel = require('../models/users');



//get/post //注册 使用中间件确定注册没有 如果 req.session.user 不为空则已注册
router.get('/',checkNotLogin,function(req,res,next){
    res.render('signup');//定位到views文件夹的signup文件
});

// 用户注册
router.post('/',checkNotLogin,function (req,res,next) {
    // res.send(req.flash());//直接发送 消息提示的中间件 req.flash

    var name = req.fields.name;

    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    console.log("avatar="+avatar);
    console.log("avatar_path="+req.files.avatar.path);
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    //校验 form表单传过来的参数
    try{
        if(!(name.length >= 1 && name.length<=10)){
            throw new Error('名字请限制在 1 - 10 个字符以内');
        }
        if(['m','f','x'].indexOf(gender)===-1){
            throw new Error('性别只能是 m f x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    }catch (err){
        fs.unlink(req.files.avatar.path);//异步删除上传的文件
        req.flash('error',err.message);
        return res.redirect('/signup');
    }
    
    //明文密码加密
    password = sha1(password);
    
    //待写入数据库的用户信息
    var user = {
        name:name,
        password:password,
        gender:gender,
        bio:bio,
        avatar:avatar,
    };
    // create 直接就是执行 mongolass index.js文件里面的 insert
    UserModel.creates(user)
        .then(function (result) {
        //  此 user 是插入mongodb 之后的值，包含 _id ,result是插入数据的完整数据
            user = result.ops[0];
            console.log(result.ops[0]);
        //    将信息存入session 但是要删掉密码
            delete user.password;
            req.session.user = user;
        //    写入flash
            req.flash('success','注册成功');
            res.redirect('/posts');
        })
        .catch(function (e) {
            fs.unlink(req.files.avatar.path);

            // 用户名被占用则跳回注册页，而不是错误页
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error', '用户名已被占用');
                return res.redirect('/signup');
            }
            next(e);
        });
});

module.exports = router;