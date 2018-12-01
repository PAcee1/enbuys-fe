/*
* @Author: Pace
* @Date:   2018-11-22 21:06:51
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-02 01:11:48
*/
require('./index.css');

var _eb     = require('util/eb.js');
// 通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function(){
    	var keyword = _eb.getUrlParam('keyword');
    	//如果keyword有值，赋值回去
    	if(keyword){
    		$('#search-input').val(keyword);
    	};
    },
    // 绑定事件
    bindEvent : function(){
    	var _this = this;
    	//点击后提交
    	$('#search-btn').click(function(){
    		_this.searchSubmit();
    	});
    	// 输入会车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
        $('#focus-me-close').click(function(){
            $('#focus-me').hide();
        });
    },
    //搜索提交
    searchSubmit: function(){
    	var keyword = $('#search-input').val();
    	//如果提交的时候有keyword，正常跳转到list页面
    	if(keyword){
    		window.open('./list.html?keyword=' +keyword);
    	}else{ // 如果为空，返回首页
    		_eb.goHome();
    	}
    }
};

module.exports = header.init();