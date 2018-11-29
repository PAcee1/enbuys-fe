/*
* @Author: Pace
* @Date:   2018-11-22 22:04:05
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-26 23:30:52
*/
/*
* @Author: Pace
* @Date:   2018-11-22 13:49:34
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-22 21:14:55
*/
require('./index.css');

var _eb = require('util/eb.js');
var templateIndex = require('./index.string');
// 侧边导航
var navSide = {
	option : {
		name : '',
		navList : [
			{name: 'user-center',desc : '个人中心', href : './user-center.html'},
			{name: 'order-list',desc : '我的订单', href : './order-list.html'},
			{name: 'user-pass-update',desc : '修改密码', href : './user-pass-update.html'},
			{name: 'about',desc : '关于嗯买', href : './about.html'}
		]
	},
    init : function(option){
    	//合并传进来的option
    	$.extend(this.option, option);
     	this.renderNav();   
    },
    //渲染导航菜单
    renderNav: function(){
    	//通过判断name是否与navList相同
    	for(var i = 0,iLength = this.option.navList.length; i<iLength;i++){
    		if(this.option.navList[i].name === this.option.name){
    			this.option.navList[i].isActive = true;
    		}
    	};
    	//渲染list数据
    	var navHtml = _eb.renderHtml(templateIndex,{
    		navList : this.option.navList
    	});
    	//把html放入容器
    	$('.nav-side').html(navHtml);
    }
};

module.exports = navSide;