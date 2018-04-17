/**
 * *子进程
 * 
 * *顶层的对象 WorkerGlobalScope 
 *  
 * 
 * *方法(function)
 * @function postMessage(data) 向主进程中发送数据
 * @function close() 关闭当前线程，与terminate作用类似
 * @function importScripts(url) 通过url在worker中加载库函数
 * 
 * 
 * *属性
 * @param {Object} self 指向顶层对象 相当于this
 * @param {Object} location 向主进程中发送数据 
 * @param {Object} navigator 向主进程中发送数据
 * 
 * *属性事件(EventListener)
 * @function onmessage 监听从主进程传过来的数据
 * @return {Object} e
 * @param {any} e.data 传过来了数据 
 * 
 * @function onerror 监听子进程发生的错误
 * @return {Object} e 
 * @param {String} e.message 可读性良好的错误信息
 * @param {String} e.filename 产生错误的脚本文件名
 * @param {String} e.lineno 发生错误时所在的脚本文件行号
 * 
 * 
 * *Ps
 * 1、不能访问Js对象：window对象、document对象、parent对象
 * 2、可以访问setInterval、clearInterval、setTimeout、clearTimeout、XMLHttpRequest、addEventListener、removeEventListener、dispatchEvent
 * 3、this 指向 WorkerGlobalScope
 * 
 * 
 * *我们可以做什么
 *　1、可以加载一个JS进行大量的复杂计算而不挂起主进程，并通过postMessage，onmessage进行通信
 *　2、可以在worker中通过importScripts(url)加载另外的脚本文件
 *　3、可以使用 setTimeout(), clearTimeout(), setInterval(), and clearInterval()
 *　4、可以使用XMLHttpRequest来发送请求
 *　5、可以访问navigator的部分属性
 *
 * 
 * *局限性
 *　1、不能跨域加载JS
 *　2、worker内代码不能访问DOM
 *　3、各个浏览器对Worker的实现不大一致，例如FF里允许worker中创建新的worker,而Chrome中就不行
 *　4、IE不支持这个新特性
 */


console.dir(WorkerGlobalScope)

console.dir(importScripts)

console.log('self ==>', self)

console.log('location ==>', location, self.location, location === self.location)

console.log('navigator ==>', navigator, self.navigator, navigator === self.navigator)

// console.log('XMLHttpRequest ==>', XMLHttpRequest, self.XMLHttpRequest, XMLHttpRequest === self.XMLHttpRequest)

// console.log('dispatchEvent ==>', dispatchEvent, self.dispatchEvent, dispatchEvent === self.dispatchEvent)

// console.log('addEventListener ==>', addEventListener, self.addEventListener, addEventListener === self.addEventListener)

// console.log('removeEventListener ==>', removeEventListener, self.removeEventListener, removeEventListener === self.removeEventListener)




// self.onmessage
onmessage = function (e) {
  console.log('监听从主进程传过来的数据 ==>', e.data.name)
  postMessage(e.data.name)
}

// self.addEventListener
addEventListener('message', function (e) {
  console.log(self === this)
  console.log('addEventListener监听从主进程传过来的数据 ==>', e.data.name)
})
// console.log('onmessage ==>', onmessage === self.onmessage, onmessage, self.onmessage)




// 错误处理事件
// self.onerror  self.addEventListener('error',(e)=>{})
onerror = function (e) {
  console.log('监听子进程发生错误的事件 ==>', e)
  close()
}
// console.log('onerror ==>', onerror === self.onerror, onerror, self.onerror)



// 关闭子进程
// self.close
// close()



// 导入文件
importScripts('./linkData.js')
console.log('子组件导入数据 ==>', linkName)



// 向主进程中发送数据
// self.postMessage
postMessage(linkName)



// alert(1)   // 会报错 alert 是 window 的方法
