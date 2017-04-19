/**
 * Created by Administrator on 2017/4/17.
 */
var express = require("express");
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var pkg = require('./package.json');

var configs = require('./config/default');

var route = require('./routes');
var app = express();

//设置视图模板
app.set('views',path.join(__dirname,'views'));
//设置模板引擎
app.set('view engine','ejs');

//设置静态文件路径
app.use(express.static(path.join(__dirname,'public')));

//session 中间件
app.use(session({
    name: configs.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: configs.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: configs.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: configs.mongodb// mongodb 地址
    })
}));
app.use(flash());

route(app);

console.log("test");
app.listen(configs.port, function () {
    console.log(`${pkg.name} listening on port ${configs.port}`);
});