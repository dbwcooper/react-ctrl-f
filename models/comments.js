/**
 * Created by Administrator on 2017/4/24.
 */

var marked = require('marked');
var Comment = require('../lib/mongo').Comment;

//将comment 的content 从markdown 转换成 html

Comment.plugin('contentToHtml',{
   afterFind:function (comments) {
       return comments.map(function (comment) {
           comment.content = marked(comment.content);
           return comment;
       })
   }

});

module.exports = {
//创建一个留言
    create:function c(comment) {
        return Comment.create(comment).exec();
    },
// 通过用户id 和 留言id删除一个留言
    delCommentById:function delcomment(commentId,author) {
        return Comment.remove({author:author,_id:commentId}).exec();
    },
// 通过文章id删除该文章下所有留言
    delCommentsByPostId:function del(postId) {
        return Comment.remove({postId:postId}).exec();
    },
    // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
    getComments: function gets(postId) {
        return Comment
            .find({postId: postId })
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: 1 })
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
//    通过文章id 获取该文章下留言数
    getCommentsCount:function getCommentsCount(postId) {
        return Comment.count({postId:postId}).exec();
    }
};










