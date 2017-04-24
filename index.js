/**
 * Created by Administrator on 2017/4/17.
 */
var express = require("express");
var path = require('path');
//session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
// var config = require('config-lite');
var pkg = require('./package.json');

// config/default.js 这个文件直接就被config-lite 里面默认exports了
// var configs = require('./config/default');

const config = require('./config/default');

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
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));

app.use(flash());
//设置模板全局变量
app.locals.blog= {
    title:pkg.name,
    description:pkg.description,
};

// this middleware will be executed for every request to the app 每个请求都将执行这个中间件
app.use(function (req,res,next) {
   res.locals.user = req.session.user;
   res.locals.success = req.flash('success').toString();
   res.locals.error = req.flash('error').toString();
   next();
});

//处理文件上传  设置特定的目录保存上传的文件
app.use(require('express-formidable')({
    uploadDir:path.join(__dirname,'/public/images'),//上传文件目录
    keepExtensions:true,//保留后缀
}));


route(app);

// console.log("Process path is: " + process.cwd()); //路径
// console.log( process.env.NODE_ENV); // production

app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});