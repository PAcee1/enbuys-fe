/*
* @Author: Pace
* @Date:   2018-11-22 21:08:06
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-28 21:38:19
*/
var _eb = require('util/eb.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/get_cart_product_count.do'),
            url : "http://localhost:8081/myCart/getCartProductCount.do",
            success : resolve,
            error   : reject
        });
    },
    // 添加商品到购物车
    addToCart : function(productInfo,resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/add.do'),
            url : "http://localhost:8081/myCart/add.do",
            data : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取购物车列表
    getCartList : function(resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/list.do'),
            url : "http://localhost:8081/myCart/list.do",
            success : resolve,
            error   : reject
        });
    },
    // 选中购物车商品
    selectProduct : function(productId,resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/list.do'),
            url : "http://localhost:8081/myCart/select.do",
            data : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消选中购物车商品
    unSelectProduct : function(productId,resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/list.do'),
            url : "http://localhost:8081/myCart/unSelect.do",
            data : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 全选
    selectAllProduct : function(resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/list.do'),
            url : "http://localhost:8081/myCart/selectAll.do",
            success : resolve,
            error   : reject
        });
    },
    // 全不选
    unSelectAllProduct : function(resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/list.do'),
            url : "http://localhost:8081/myCart/unSelectAll.do",
            success : resolve,
            error   : reject
        });
    },
    // 更新商品数量
    updateProduct : function(productInfo,resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/list.do'),
            url : "http://localhost:8081/myCart/update.do",
            data : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除商品，可以批量
    deleteProduct : function(productIds,resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/list.do'),
            url : "http://localhost:8081/myCart/deleteProduct.do",
            data : {
                productIds:productIds
            },
            success : resolve,
            error   : reject
        });
    }

}
module.exports = _cart;