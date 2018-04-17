/**
 * *Geolocation 
 * 用于定位用户的位置
 * 
 * 
 * *方法
 * @function getCurrentPosition(showPosition,showError [,opations]) 获得用户的位置
 * @param {Function} showPosition(position)
 * showPosition 参数
 *   @param {Object} position 
 *     @param {Object} latitude 纬度
 *     @param {Object} longitude 经度
 *     @param {Object} altitude 海拔高度
 *     @param {Object} accuracy 纬度和经度的精度，以米为单位
 *     @param {Object} latitudeAccuracy 海拔高度的精度，以米为单位
 *     @param {Object} heading 设备的前进方向,speed 设备的前进速度以单位m/s
 *     @param {Object} timestamp 获取位置的时间　　　　　　　　　　　　　　　　　　　
 *  
 * @param {Function} showError(error) 用于处理错误。当获取用户位置失败时运行的函数
 * showError 参数
 *   @param {Object} error 返回错误信息
 *     @param {Number} code 1:表示用户拒绝了定位服务,2:获取不到位置信息,3:获取信息超时错误
 *     @param {String} message 表示错误信息
 * 
 * @param {any} opations 可选属性的列表
 *    @param {Boolean} enableHighAccuracy 是否要求高精度的地理位置信息 值为true或false。
 *    @param {Number} timeout 对地理信息获取操作做一个超时限制，如果超时，则返回错误, 值为数字，单位为毫秒
 *    @param {Number} maximumAge 对地理位置信息进行缓存的有效时间做一个限制 值为数字，单位为毫秒。
 * 
 * 
 * 
 * @function watchPosition(showPosition,showError [,opations]) 返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）返回参数与getCurrentPosition相同
 * 
 * @function watchPosition() 停止 watchPosition() 方法
 * 
 */

if (navigator.geolocation) {
  var x, y
  var map = new BMap.Map("container")
  var point = new BMap.Point(x, y)
  map.centerAndZoom(point, 12)
  var geolocation = new BMap.Geolocation()
  console.log(geolocation)
  geolocation.getCurrentPosition(showPosition, showError, { timeout: 5000, enableHighAccuracy: true })

} else {
  console.log('该浏览器不支持获取地理位置。')
}

// 成功时调用的函数
function showPosition (position) {
  console.log('获取地区信息 ==>', position)
  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    var mk = new BMap.Marker(position.point);
    map.addOverlay(mk);
    map.panTo(position.point);
  }
  else {
    alert('failed' + this.getStatus());
  }
}

// 失败时调用的函数
function showError (err) {
  console.log('获取地区失败信息 ==>', err)
}
