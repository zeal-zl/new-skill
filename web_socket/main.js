
/**
 * *WebSocket 
 * 
 * 
 * *desc
 * HTML5提供的一种在单个 TCP 连接上进行全双工通讯的协议。
 * 
 * 
 * *构造函数
 * WebSocket(url) 
 * @param {String} url     ps:必须遵循同源策略
 * @return {Object} 一个新的 Worker
 * 
 * 
 * *创建实例
 * let ws = new WebSocket('服务器地址')
 * 
 * 
 * *特点
 * 1、服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。
 * 2、建立在 TCP 协议之上，服务器端的实现比较容易。
 * 3、与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
 * 4、数据格式比较轻量，性能开销小，通信高效。
 * 5、可以发送文本，也可以发送二进制数据。
 * 6、没有同源限制，客户端可以与任意服务器通信。
 * 7、协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
 * 
 * 
 * *方法（function）
 * @function send(data) 用于向服务器发送数据
 * data的类型 => String、Blob、Arraybuffer、Bytebuffer
 * 
 * @function close([code [,reason]]) 关闭连接
 * code：关闭连接状态码、 reason：关闭连接原因，两个都是选填
 * 
 * 
 * *属性
 * @param {Number} readyState 值 ==> 0、1、2、3
 * CONNECTING：值为0，表示正在连接。
 * OPEN：值为1，表示连接成功，可以通信了。
 * CLOSING：值为2，表示连接正在关闭。
 * CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
 * 
 * @param {String} binaryType 显式指定收到的二进制数据类型。
 * 1、blob
 * 2、arraybuffer
 * 
 * @param {Number} bufferedAmount 表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
 * 
 * @param {String/Array} protocol 指定了可接受的子协议，可以有多个
 * 
 * 
 * *属性事件（EventListener）
 * @function onopen 连接建立时触发
 * @return {Object} e
 * 
 * @function onmessage 客户端接收服务端数据时触发
 * @return {Object} e
 * @param {any} e.data 返回数据
 * 
 * @function onclose 连接关闭时触发
 * @return {Object} e
 * @param {Boolean} e.wasClean  true => 客户端或服务器调用 close 主动关闭， false => 反之
 * @param {Number} e.code 关闭连接状态码 默认值1000 标识正常关闭  取值范围 3000 - 4999
 * @param {String} e.reason 关闭连接的原因
 * 
 * @function onerror 通信发生错误时触发
 * @return {Object} e
 * 
 * 
 * *缺点
 * 不支持IE6、IE7、IE8、IE9
 * 宽带和耗电量问题(移动平台)   ps:(好像有相对的优化方案了)
 * 
 */

/**
 * *握手协议
 * 使用的是HTTP的简化版握手协议
 * 
 * *客户端
 * 创建WebSocket 浏览器就会自动发送以下内容
 * GET /chat HTTP/1.1
 * Host: server.example.com
 * Upgrade: websocket                                     // websocket 的核心  告诉服务器发起的是一个 websocket 服务
 * Connection: Upgrade                                    // 同上
 * Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==            // 是一个Base64 encode的值，这个是浏览器随机生成的
 * Sec-WebSocket-Protocol: chat, superchat                // 是一个用户定义的字符串，用来区分同URL下，不同的服务所需要的协议
 * Sec-WebSocket-Version: 13                              // 服务器所使用的Websocket Draft（协议版本）
 * Origin: http://example.com
 * 
 * 
 * *服务端
 * 返回数据
 * HTTP/1.1 101 Switching Protocols
 * Upgrade: websocket
 * Connection: Upgrade 
 * Sec-WebSocket-Protocol: chat                            // 表示最终使用的协议
 * Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=      // 是经过服务器确认，并且加密过后的 Sec-WebSocket-Key
 * 是通过Sec-WebSocket-Key 加magic string连接成一个新的key串；将新的key串SHA1编码，生成一个由多组两位16进制数构成的加密串；把加密串进行base64编码生成最终的key
 * 
 * *握手完成后触发 onopen 事件
 */

// 创建一个实例
let ws = new WebSocket('wss://echo.websocket.org')

console.log('ws实例 ==>', ws)
console.log('ws连接时所用状态 ==>', ws.CONNECTING, ws.OPEN, ws.CLOSING, ws.CLOSED)
console.log('ws连接状态 ==>', ws.readyState)




ws.onopen = function (e) {
  console.log('连接建立时返回对象 ==>', e)
  console.log('ws连接状态 ==>', ws.readyState)
  ws.send('Hello WebSockets!-----------')
}



// 指定收到的二进制数据类型。
ws.binaryType = 'blob'
// ws.binaryType = 'Arraybuffer'

// 客户端接收服务端数据时触发
ws.onmessage = function (e) {
  console.log('客户端接收服务端数据时返回对象 ==>', e)
  console.log('ws连接状态 ==>', ws.readyState)
  ws.close(1000, 'Lyle')
}



// 通信发生错误时触发
ws.onerror = function (e) {
  console.log('通信发生错误时返回对象 ==>', e)
  console.log('ws连接状态 ==>', ws.readyState)
}



// 连接关闭时触发
ws.onclose = function (e) {
  console.log('连接关闭时返回对象 ==>', e)
  console.log('ws连接状态 ==>', ws.readyState)
}


