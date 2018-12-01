/*
* @Author: Pace
* @Date:   2018-11-22 22:32:18
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-01 22:58:00
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _eb = require('util/eb.js');

//操作成功后的提示
$(function(){
	var type = _eb.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	if(type === 'payment'){
		var orderNumber = _eb.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
	}
	//根据url的参数，显示div
	$element.show();

	
})