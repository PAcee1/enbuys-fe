/*
* @Author: Pace
* @Date:   2018-11-27 20:56:20
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-02 01:53:22
*/
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var templateIndex =  require('./index.string');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js'); 
var _eb = require('util/eb.js');

var page = {
	//定义全局参数
	data : {
		productId : _eb.getUrlParam('productId'),
		detailInfo : ''
	},
	//页面一加载便初始化
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad :function(){
		//判断是否存在productId,不存在返回主页

		/*if(this.data.productId){
			_eb.goHome();
		}*/
		//存在加载
		this.loadDetail();
	},
	bindEvent : function(){
		var _this = this;
		//图片预览功能
		$(document).on('mouseenter','.p-img-item',function(){
			//一层层取出src属性
			var imageUrl = $(this).find('.p-img').attr('src');
			//将主图src更改
			$('.main-img').attr('src',imageUrl);
		});
		//数量加减的操作
		$(document).on('click','.p-count-btn',function(){
			var type = $(this).hasClass('plus') ? 'plus' : 'minus', //判断是加还是减
				$pCount = $('.p-count'), //输入框
				currCount = parseInt($pCount.val()), //输入框中的数量
				minCount = 1, //最小数量为1
				maxCount = _this.data.detailInfo.stock || 1; //最大数量为库存
			//判断加减，并实现动作
			if(type === 'plus'){
				//判断是否超过最大值
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			}else if(type === 'minus'){
				//判断是否超过最小值
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		});
		//商品数量输入框
        $(document).on('input', '#detail-input-count', function(){
        	var $this = $(this),
        		currCount = parseInt($this.val());
           		minCount = 1,
        		maxCount = parseInt($('#p-stock').html());
    		if(currCount > maxCount){
    			_eb.errorTips('该商品数量已达到上限');
    			$this.val(maxCount);
    		}
			if(currCount < minCount){
    			_eb.errorTips('别减了，再减没了，不需要请直接删除！');
    			$this.val(minCount);
    		}
        });
		//加入购物车
		$(document).on('click','.cart-add',function(){
			_cart.addToCart({
				productId : _this.data.productId,
				count : $('.p-count').val()
			},function(res){
				window.location.href = './result.html?type=cart-add&';
			},function(errMsg){
				_eb.errorTips(errMsg);
			});
		});
		//立即购买
		$(document).on('click','.goto-buy',function(){
			_cart.addToCart({
				productId : _this.data.productId,
				count : $('.p-count').val()
			},function(res){
				window.location.href = './order-confirm.html';
			},function(errMsg){
				_eb.errorTips(errMsg);
			});
		});
		//查看评价
		$(document).on('click','.tab-item',function(){
			alert('尚未开发，请等待.');
		});
	},
	//加载商品详情
	loadDetail : function(){
		var html = '',
			_this = this,
			$pageWrap = $('.page-wrap');
		//loading
		$pageWrap.html('<div class="loading"></div>')
		//请求product接口
		_product.getProductDetail(this.data.productId,function(res){
			//处理数据
			_this.filter(res);
			//保存数据到全局，以供使用
			_this.data.detailInfo = res;
			//成功渲染
			html = _eb.renderHtml(templateIndex,res);
			$pageWrap.html(html);
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">此商品找不到啦~</p>');
		});
	},
	//处理数据
	filter : function(data){
		data.subImages = data.subImages.split(',');
	}
	
};
$(function(){
	page.init();
});