/*
 * @Author: Pace 
 * @Date: 2018-11-29 21:25:37 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-14 22:39:22
 */
var _eb = require('util/eb.js');

var _order = {
    // 获取订单商品详细信息
    getProductList : function( resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myOrder/getOrderCartProduct.do'),
            //url : "http://localhost:8080/myOrder/getOrderCartProduct.do",
            success : resolve,
            error   : reject
        });
    },
    //创建订单
    createOrder: function(orderInfo, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myOrder/create.do'),
            //url : "http://localhost:8080/myOrder/create.do",
            data: orderInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取订单列表
    getOrderList: function(listParam, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myOrder/list.do'),
            //url : "http://localhost:8080/myOrder/list.do",
            data: listParam,
            success : resolve,
            error   : reject
        });
    },
    //获取订单详情
    getOrderDetail: function(orderNumber, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myOrder/detail.do'),
            //url : "http://localhost:8080/myOrder/detail.do",
            data: {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
     //取消订单
     cancelOrder: function(orderNumber, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myOrder/cancel.do'),
            //url : "http://localhost:8080/myOrder/cancel.do",
            data: {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;