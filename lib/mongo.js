/**
 * Created by Administrator on 2017/4/21.
 */

var config = require('../config/default');

var Mongolass = require('mongolass');
var mongolass = new Mongolass();

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
mongolass.connect(config.mongodb);

console.log("success connect mongodb ! ");

//注册 addCreatedAt 方法
mongolass.plugin('addCreatedAt',{
    afterFind:function (results) {
        results.forEach(function (item) {
            item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne:function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

//返回的是一个 collection 里面包含这几个对象 执行 mongolass 里面的 index.js model方法
exports.User = mongolass.model('User',{
    name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string',enum:['m','f','x']},
    bio:{type:'string'}
});
// 根据用户名找到用户，用户名全局唯一  index 相当于执行 ensureIndex 将name 作为一个索引
exports.User.index({name:1},{unique:true}).exec();

// post文章model
exports.Post = mongolass.model('Post',{
    author:{type:Mongolass.Types.ObjectId},
    title:{type:'string'},
    content:{type:'string'},
    pv:{type:'number'},
});
// 按照时间顺序 降序排列
exports.Post.index({ author:1,_id:-1}).exec();