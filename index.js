/**
 * Created by Administrator on 2017/4/17.
 */
var express = require("express");
var app = express();

// app.use('/',function (req,res) {
//     res.end("test");
// });

// app.get('/',function (req,res,next) {
//     console.log("get1");
//     next();
// },function (req,res,next) {
//     res.send("get2");
//     console.log("log2");
//     next();
// });

// app.use('/',function re(req,res,next) {
//     res.end("next");
// });
app.use('/user/:id', function(req, res, next) {
    //console.log('Request URL:', req.originalUrl);
    console.log("this is id test");
    if(req.params.id == 0){
        next('route');
    }else{
        next();
    }
    next();
}, function (req, res, next) {
    //console.log('Request Type:', req.method);
    next();
});

app.use('/user/:id',function (req,res,next) {
   console.log("this is new route");
   // res.encoding = 'utf8';
   res.send("next route");
});



console.log("test");
app.listen(3000);