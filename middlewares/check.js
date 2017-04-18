/**
 * Created by Administrator on 2017/4/18.
 */

module.exports = {
    checkLogin:function (req,res,next) {
        if(req.session.user){
            //登录成功 有权限
            req.flash('success','已登录');
            return res.redirect('back');
        }else{
            req.flash('error','未登录');
            return res.redirect('/signin');
        }
        next();
    }
}