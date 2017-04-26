/**
 * Created by Administrator on 2017/4/22.
 */

var posts = require('../lib/mongo').Post;
var marked = require('marked');
var CommentModel = require('./comments');
// 将post的content 从 markdown 转为 html
posts.plugin('contentToHtml', {
    afterFind: function (postss) {
        return postss.map(function (post) {
            post.content = marked(post.content);
            return post;
        });
    },
    afterFindOne: function (post) {
        if (post) {
            post.content = marked(post.content);
        }
        return post;
    }
});
posts.plugin('addCommentsCount', {
    afterFind: function (posts) {
        return Promise.all(posts.map(function (post) {
            return CommentModel.getCommentsCount(post._id).then(function (commentsCount) {
                post.commentsCount = commentsCount;
                return post;
            })
        }));
    },
    afterFindOne: function (post) {
        if (post) {
            return CommentModel.getCommentsCount(post._id).then(function (count) {
                post.commentsCount = count;
                return post;
            });
        }
        return post;
    }
});
module.exports = {
    //创建 一篇文章
    createPost: function createOnePost(postss) {
        return posts.create(postss).exec();
    },
    //通过文章id 获取一篇文章
    getPostById: function getPostById(postId) {
        return posts
            .findOne({_id: postId})
            .populate({path: 'author', model: 'User'})
            .addCreatedAt()
            .addCommentsCount()
            .contentToHtml()
            .exec();
    },
//    按照创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getposts: function getpost(author) {
        var query = {};
        if (author) {
            query.author = author;
        }
        return posts
            .find(query)
            .populate({path: 'author', model: 'User'})
            .sort({_id: -1})
            .addCreatedAt()
            .addCommentsCount()
            .contentToHtml()
            .exec();
    },

//  通过 文章 id 给pv加 1
    incPv: function incPv(postId) {
        return posts
            .update({_id: postId}, {$inc: {pv: 1}})
            .exec();
    },
//    通过文章id 获取一篇原生文章 (编辑文章)
    getRawPostById: function getRawPostById(postId) {
        return posts
            .findOne({_id: postId})
            .populate({path: 'author', model: 'User'})
            .exec();
    },
//    通过用户id和文章id更新一篇文章
    updatePostById: function update(postId, author,content) {
        return posts.update({author: author, _id: postId}, {$set: content}).exec();
    },

//    通过用户id和文章 id 删除一篇文章
    delPostById: function del(postId, author) {
        return posts
            .remove({author: author, _id: postId})
            .exec()
            .then(function (res) {
                //    文章删除后再删除文章下的留言
                if (res.result.ok && res.result.n > 0) {
                    return CommentModel.delCommentsByPostId(postId);
                }
            });
    },


};