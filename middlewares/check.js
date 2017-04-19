/**
 * Created by Administrator on 2017/4/18.
 */

module.exports = {
    checkLogin:function checkLogin(req,res,next) {
        if(req.session.user){
            //登录成功
            req.flash('success','已登录');
            return res.redirect('back');
        }else{
            //跳转到 登录界面
            req.flash('error','未登录');
            return res.redirect('/signin');
        }
        next();
    }
};