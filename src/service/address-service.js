/*
 * @Author: Pace 
 * @Date: 2018-11-29 23:15:47 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-11-29 23:16:59
 */
var _eb = require('util/eb.js');

var _address = {
    // 获取购物车数量
    getAddressList : function(resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/cart/get_cart_product_count.do'),
            url : "http://localhost:8081/myShipping/list.do",
            data : {
                pageSize : 50,
            },
            success : resolve,
            error   : reject
        });
    }

}
module.exports = _address;