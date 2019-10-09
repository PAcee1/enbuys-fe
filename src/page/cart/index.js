/*
* @Author: Pace
* @Date:   2018-11-28 13:39:13
 * @Last Modified by: Pace
 * @Last Modified time: 2019-04-13 13:43:11
*/

require('page/common/header/index.js');
require('./index.css');
var templateIndex =  require('./index.string');
var nav = require('page/common/nav/index.js');
var _cart = require('service/cart-service.js'); 
var _eb = require('util/eb.js');

var page = {
	//定义全局参数
	data : {

	},
	//页面一加载便初始化
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad :function(){
		
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		//商品的选择和取消选择
		 $(document).on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // 选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            // 取消选中
            else{
            	//tr.removeClass("select");
                _cart.unSelectProduct(productId, function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            
        });
        // 商品的全选 / 取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            // 全选
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
            // 取消全选
            else{
                _cart.unSelectAllProduct(function(res){
                    _this.renderCart(res);
                }, function(errMsg){
                    _this.showCartError();
                });
            }
        });
        //商品数量变化
        $(document).on('click', '.count-btn', function(){
        	var $this = $(this),
        		$pCount = $this.siblings('.count-input'),
        		currCount = parseInt($pCount.val()),
        		type = $this.hasClass('plus') ? 'plus' : 'minus',
        		productId = $this.parents('.cart-table').data('product-id'),
        		minCount = 1,
        		maxCount = parseInt($pCount.data('max'));
        		newCount = 0;
        	if(type === 'plus'){ // 如果是加
        		if(currCount >= maxCount){
        			_eb.errorTips('该商品数量已达到上限');
        			return ;
        		}
        		newCount = currCount + 1;
        	}else{ // 减
				if(currCount <= minCount){
        			_eb.errorTips('别减了，再减没了，不需要请直接删除！');
        			return ;
        		}
        		newCount = currCount - 1;
        	}
        	//更新数量
        	_this.updateProduct(productId,newCount);
        });
        //商品数量输入框
        $(document).on('input', '.count-input', function(){
        	var $this = $(this),
        		currCount = parseInt($this.val());
        		//currCount = parseInt($pCount.val()),
        		type = $this.hasClass('plus') ? 'plus' : 'minus',
        		productId = $this.parents('.cart-table').data('product-id'),
        		minCount = 1,
        		maxCount = parseInt($this.data('max'));
    		if(currCount > maxCount){
    			_eb.errorTips('该商品数量已达到上限');
    			$this.val(maxCount);
    			currCount = maxCount;
    		}
			if(currCount < minCount){
    			_eb.errorTips('别减了，再减没了，不需要请直接删除！');
    			$this.val(minCount);
    			currCount = minCount;
    		}
        	//更新数量
        	_this.updateProduct(productId,currCount);
        });
		//删除单个商品
		$(document).on('click', '.cart-delete', function(){
			if(window.confirm('确认要删除该商品吗？')){
				var productId = $(this).parents('.cart-table')
								.data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		//删除选中商品
		$(document).on('click', '.delete-selected', function(){
			var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked'); //被选中的商品
            //循环添加被选中的productId 到数组中
            for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                arrProductIds.push($($selectedItem[i])
                	.parents('.cart-table').data('product-id'));
            }
            if(arrProductIds.length){
            	if(window.confirm('确认要删除选中的商品吗？')){
                	_this.deleteCartProduct(arrProductIds.join(','));
                }
            }
            else{
                _eb.errorTips('您还没有选中要删除的商品');
            }  
		});
		// 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _eb.errorTips('请选择商品后再提交');
            }
        });
	},
	//加载购物车信息
	loadCart : function(){
		var html = '',
			_this = this,
			$pageWrap = $('.page-wrap');
		//loading
		/*$pageWrap.html('<div class="loading"></div>')*/
		//获取购物车列表
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			//失败返回信息
			_this.showCartError();
		});
		
	},
	//渲染购物车
	renderCart: function(data){
		//处理数据
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成html
		debugger;
		var cartHtml = _eb.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);
		//通知导航的购物车更新数量
		nav.loadCartCount();
	},
	//修改商品数量
	updateProduct : function(productId,count){
		var _this = this;
		_cart.updateProduct({
    		productId: productId,
    		count : count
    	},function(res){
			_this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
    	});
	},
	//删除指定商品，支持批量，productId用，分隔
	deleteCartProduct : function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
			_this.renderCart(res);
		},function(errMsg){
			//失败返回信息
			_this.showCartError();
		});
	},
	//处理数据
	filter : function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	//显示错误信息
	showCartError : function(){
		$('.page-wrap').html('<p class="err-tip">出现问题了！</p>')
	}
	
};
$(function(){
	page.init();
});