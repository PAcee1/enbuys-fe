/*
* @Author: Pace
* @Date:   2018-11-22 14:01:14
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-14 22:45:05
*/
var _eb = require('util/eb.js');

var _user = {
    //用户登录
    login : function(userInfo,resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/login.do'),
           // url     : 'http://localhost:8080/myUser/login.do',
            data : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/logout.do'),
            //url     : 'http://localhost:8080/myUser/logout.do',
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //检查用户名是否存在
    checkUsername : function(username,resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/checkValid.do'),
            //url : "http://localhost:8080/myUser/checkValid.do",
            data : {
                type : 'username',
                str : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //用户注册
    register : function(userInfo,resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/register.do'),
            //url : "http://localhost:8080/myUser/register.do",
            data : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/getUserInfo.do'),
            //url : "http://localhost:8080/myUser/getUserInfo.do",
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/forgetGetQuestion.do'),
            //url : "http://localhost:8080/myUser/forgetGetQuestion.do",
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/forgetCheckAnswer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //修改新密码
    resetPassword: function(userInfo, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/forgetResetPassword.do'),
            //url : "http://localhost:8080/myUser/forgetResetPassword.do",
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getInformation : function(resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/getInformation.do'),
            //url : "http://localhost:8080/myUser/getInformation.do",
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/user/updateInformation.do'),
           // url : "http://localhost:8080/myUser/updateInformation.do",
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下更新密码
    updatePassword : function(userInfo, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myUser/resetPassword.do'),
            //url : "http://localhost:8080/myUser/resetPassword.do",
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _user;