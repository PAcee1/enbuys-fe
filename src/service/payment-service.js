/*
 * @Author: Pace 
 * @Date: 2018-12-01 22:41:15 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-14 22:39:39
 */
var _eb = require('util/eb.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo : function(orderNo, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myOrder/pay.do'),
            //url : "http://localhost:8081/myOrder/pay.do",
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
            url     : _eb.getServerUrl('/myOrder/query_order_pay_status.do'),
            //url : "http://localhost:8081/myOrder/query_order_pay_status.do",
            data : {
                orderNo : orderNo
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;