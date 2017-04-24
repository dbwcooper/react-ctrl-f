/**
 * Created by Administrator on 2017/4/18.
 */

var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var PostModel = require('../models/posts');
/**
 * 1.查看所有用户(/posts) 或者 特定用户(/posts/author=XX)的文章  GET
 * 2.作者发表一篇文章 POST
 */
router.get('/', function(req, res, next) {
    var author = req.query.author;
    //查找特定用户或者所有用户的文章
    PostModel.getposts(author)
        .then(function (posts) {
            res.render('posts', {
                posts: posts
            });
        })
        .catch(next);
});

router.post('/',checkLogin,function (req,res,next) {
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

//    校验参数
    try{
        if(!title.length){
            throw new Error('请填写标题');
        }
        if(!content.length){
            throw new Error('请填写内容');
        }
    }catch (err){
        req.flash('error',err.message);
    }

    var post = {
        author:author,
        title:title,
        content:content,
        pv:0
    };

    PostModel.createPost(post)
        .then(function (result) {
            //    result.ops 是 插入后的值 mongodb里面的完整post
            post = result.ops[0];
            console.log(post);
            req.flash('success',"发表成功");
            //    发表成功后跳转到该文章页面
            res.redirect(`/posts/${post._id}`);
        })
        .catch(next);
});

//GET 跳转到发表文章页面
router.get('/create',checkLogin,function (req,res,next) {
   res.render('create');
});

//POST 发表一篇文章
router.post('/create',checkLogin,function (req,res,next) {


});


//GET 查看某一篇文章
router.get('/:postId',function (req,res,next) {
   res.send(req.flash());
});
//更新文章页
router.get('/:postId/edit',checkLogin,function (req,res,next) {
   var postId = req.params.postId;
   var author = req.sessoin.user._id;
   PostModel.getRawPostById(postId)
       .then(function (post) {
           if(!post){
               throw new Error('该文章不存在');
           }
           if(author.toString() !== post.author._id.toString()){
               throw new Error('权限不足');
           }
           res.render('edit',{
               post:post,
           });
       })
       .catch(next);
});
//更新一篇文章
router.post('/:postId/edit',checkLogin,function (req,res,next) {
    var postId = req.params.postId;
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    PostModel.updatePostById(postId, author, { title: title, content: content })
        .then(function () {
            req.flash('success', '编辑文章成功');
            // 编辑成功后跳转到上一页
            res.redirect(`/posts/${postId}`);
        })
        .catch(next);
});
//删除一篇文章
router.get('/:postId/remove',checkLogin,function (req,res,next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    PostModel.delPostById(postId, author)
        .then(function () {
            req.flash('success', '删除文章成功');
            // 删除成功后跳转到主页
            res.redirect('/posts');
        })
        .catch(next);
});
//创建一条留言
router.post('/:postId/comment',checkLogin,function (req,res,next) {
    res.send(req.flash());
});
//删除一条留言
router.post('/:postId/comment/:commentId/remove',checkLogin,function (req,res,next) {
    res.send(req.flash());
});

module.exports = router;