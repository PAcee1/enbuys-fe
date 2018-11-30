/*
 * @Author: Pace 
 * @Date: 2018-11-30 23:56:42 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-01 01:12:30
 */
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide =  require('page/common/nav-side/index.js');
var _eb = require('util/eb.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
    data : {
        orderNumber : _eb.getUrlParam('orderNo')
    },
	init : function(){
        this.onLoad();
        this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		//加载订单List
		this.loadOrderDeatil();
    },
    bindEvent: function(){

    },
	//加载用户信息
	loadOrderDeatil : function(){
        var _this = this, 
            $content = $('.content.with-nav');
            loadOrderDeatil = '';
		_order.getOrderDetail(this.data.orderNumber,function(res){
            //渲染
			loadOrderDeatil = _eb.renderHtml(templateIndex,res);
            $content.html(loadOrderDeatil);
            //判断订单支付状态，已取消的订单移除active
        },function(errMsg){//失败返回错误信息
			$content.html('<p class="err-tip">'+ errMsg +'</p>')
		})
    }
	
}
//调用初始化方法
$(function(){
	page.init();
});