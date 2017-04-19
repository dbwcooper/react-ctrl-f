/**
 * Created by Administrator on 2017/4/18.
 */

var express = require('express');
var router = express.Router();
var check = require('../middlewares/check').checkLogin();

/**
 * 1.查看所有用户(/posts) 或者 特定用户(/posts/author=XX)的文章  GET
 * 2.作者发表一篇文章 POST
 */
router.use('/',check,function (req,res,next) {
   res.send(req.flash());
});

//GET 跳转到发表文章页面
router.use('/create',check,function (req,res,next) {
   res.send(req.flash());
});



//GET 查看某一篇文章
router.get('/:postId',function (req,res,next) {
   res.send(req.flash());
});

//更新一篇文章
router.post('/:postId/edit',check,function (req,res,next) {
    res.send(req.flash());
});
//删除一篇文章
router.get('/:postId/remove',check,function (req,res,next) {
    res.send(req.flash());
});
//创建一条留言
router.post('/:postId/comment',check,function (req,res,next) {
    res.send(req.flash());
});
//删除一条留言
router.post('/:postId/comment/:commentId/remove',check,function (req,res,next) {
    res.send(req.flash());
});

module.exports = router;