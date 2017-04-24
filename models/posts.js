/**
 * Created by Administrator on 2017/4/22.
 */

var posts = require('../lib/mongo').Post;
var marked = require('marked');

// 将post的content 从 markdown 转为 html
posts.plugin('contentToHtml',{
    afterFind:function (postss) {
        return postss.map(function (post) {
            post.content = marked(post.content);
            return post;
        });
    },
    afterFindOne:function (post) {
      if(post){
          post.content = marked(post.content);
      }
      return post;
    }
});
module.exports = {
    //创建 一篇文章
    createPost:function createOnePost(posts) {
        return posts.create(posts).exec();
    },
    //通过文章id 获取一篇文章
    getPostById:function getPostById(postId) {
        return Post
            .findOne({ _id:postId})
            .populate({path:'author',model:'User'})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
//    按照创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getposts:function getposts(author) {
        var query = {};
        if(author){
            query.author = author;
        }
        return posts
            .find(query)
            .populate({path:'author',model:'User'})
            .sort({_id:-1})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },

//  通过 文章 id 给pv加 1
    incPv:function incPv(postId) {
        return posts
            .update({_id:postId},{$inc:{pv:1}})
            .exec();
    },
//    通过文章id 获取一篇原生文章 (编辑文章)
    getRawPostById:function getRawPostById(postId) {
        return posts
            .findOne({_id:postId})
            .populate({path:'author',model:'User'})
            .exec();
    },
//    通过用户id和文章id更新一篇文章
    updatePostById:function update(postId,author) {
        return posts.update({author: author, _id: postId}, {$set: data}).exec();
    },

//    通过用户id和文章 id 删除一篇文章
    delPostById:function del(postId,author) {
        return posts.remove({author:author,_id:postId}).exec();
    }


};