

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    // 404 page 如果之前的路径都没有的话 就会执行这个
    app.use(function (req,res) {
        // console.log(req.path);
        // console.log(res.headersSent);
        if(!res.headersSent){
            res.status(404).render('404');
        }
    })
};
