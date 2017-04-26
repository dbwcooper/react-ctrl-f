

module.exports = {
    port:3000,
    session:{
        secret:'myblog',
        key:'myblog',
        maxAge:2592000000
    },
    mongodb:'mongodb://dbcookie:dbcookie@ds121091.mlab.com:21091/blog'
};