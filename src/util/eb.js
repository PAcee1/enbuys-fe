/*
* @Author: Pace
* @Date:   2018-11-21 22:44:30
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-14 22:40:13
* 一个通用工具js
*/
var Hogan = require('hogan');
var conf = {
	serverHost : ''
};
var _eb = {
	//封装请求
	request : function(param){
		var _this = this;
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
	},
	// 获取服务器地址
    getServerUrl : function(path){
        //测试环境
        //return "http://localhost:8081" + path;
        //线上环境
        return "http://www.enbuys.com" + path;
    },
    // 获取url参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染Html模版
    renderHtml : function(htmlTemplate, data){
    	var template = Hogan.compile(htmlTemplate),
    		result = template.render(data);
    	return result;
    },
    //成功提示
    successTips : function(msg){
    	alert(msg || '操作成功');
    },
    //错误提示
    errorTips : function(msg){
    	alert(msg || '哪里出错了~');
    },
    //字段验证,手机、邮箱及非空判断
    validate : function(value, type){
    	var value = $.trim(value);
    	//非空验证
    	if(type === 'require'){
    		return !!value;
    	}
    	//手机验证
    	if(type === 'phone'){
    		return /^1\d{10}$/.test(value);
    	}
    	//邮箱验证
    	if(type === 'email'){
    		return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
    	}
    },
	//统一登陆处理
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//跳转主页
	goHome : function(){
		window.location.href = './index.html';
	}

};


module.exports = _eb;
