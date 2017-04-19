var express = require('express');
var router = express.Router();

//
// //这里也不需要用到 next中间件
// router.get('/',function (req,res,next) {
//     res.redirect('/posts');
// });
//
// //get post 或其他请求全部处理了 登录相关操作
// router.use('/signin',require('./signin'));
//
// //登出相关操作
// router.use('/signout',require('./signout'));
//
// //注册相关操作
// router.use('/signup',require('./signup'));
//
// //文章页面相关操作
//
// router.use('/posts',require('./posts'));
//
//
// module.exports = router;


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
};
