/**
 * Created by Administrator on 2017/4/21.
 */

var User = require('../lib/mongo').User;

module.exports = {

    //注册一个用户
    creates:function createdemo(user){
        //User.create是 相当于 User.insertOne(user).exec();
        return User.create(user).exec();
    },

    // 通过用户名获取用户信息 登录时使用 addcreatedAt 自定义插件 通过_id 生成时间戳
    getUserByName:function signin(name) {
        return User
            .findOne({name:name})
            .addCreatedAt()
            .exec();
    }
};