/*
 * @Author: Pace 
 * @Date: 2018-12-01 22:21:28 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-01 22:50:59
 */
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var _eb = require('util/eb.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
    data : {
        orderNumber : _eb.getUrlParam('orderNo')
    },
	init : function(){
        this.onLoad();
	},
	onLoad : function(){
		//不断监听订单支付状态
		this.loadPaymentInfo();
    },
	//加载支付信息
	loadPaymentInfo : function(){
        var _this = this, 
            $pageWrap = $('.payment-con');
            paymentHtml = '';
        $pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(this.data.orderNumber,function(res){
            //渲染
			paymentHtml = _eb.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            //开启监听状态，监听订单是否成功支付
            _this.listenOrderStatus();
        },function(errMsg){//失败返回错误信息
			$pageWrap.html('<p class="err-tip">'+ errMsg +'</p>')
		})
    },
    listenOrderStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res == true){
                    //订单支付成功，跳到成功页面
                    window.location.href ='./result.html?type=payment&orderNumber='+_this.data.orderNumber;
                }
            });
        },5e3);
    }
	
}
//调用初始化方法
$(function(){
	page.init();
});