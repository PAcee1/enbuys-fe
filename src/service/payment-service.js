/*
 * @Author: Pace 
 * @Date: 2018-12-01 22:41:15 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-01 22:49:24
 */
var _eb = require('util/eb.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo : function(orderNo, resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/product/list.do'),
            url : "http://localhost:8081/myOrder/pay.do",
            data : {
                orderNo : orderNo
            },
            success : resolve,
            error   : reject
        });
    },
    // 查询订单支付状态
    getPaymentStatus : function(orderNo, resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/product/list.do'),
            url : "http://localhost:8081/myOrder/query_order_pay_status.do",
            data : {
                orderNo : orderNo
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;