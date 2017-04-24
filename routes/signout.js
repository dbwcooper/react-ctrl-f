/**
 * Created by Administrator on 2017/4/18.
 */

var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//GET 登出操作  不检查中间件 check
router.get('/',checkLogin,function (req,res,next) {
//    清空session 中用户信息
    console.log("登出操作");
    req.session.user = null;
    req.flash('success','登出成功');
    res.redirect('/posts');
});

module.exports = router;