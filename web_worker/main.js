/**
 * *Worker
 * 
 * *构造函数
 * Worker(url) 
 * @param {String} url     ps:必须遵循同源策略
 * @return {Object} 一个新的 Worker
 * 
 * 
 * *创建实例
 * let w = new Worker('执行的子进程文件')
 * 
 * 
 * *方法
 * @function postMessage(data) 向子进程中发送数据
 * 
 * @function terminate() 立即终止 worker。该方法不会给 worker 留下任何完成操作的机会；就是简单的立即停止   Ps:关闭后不能重新打开，只能重新创建
 * 
 * 
 * *属性
 * *事件（EventListener）
 * @function onmessage 监听子进程传过来的数据
 * @return {Object} e
 * @param {any} e.data 传过来了数据 
 * 
 * @function onerror 监听子进程发生的错误
 * @return {Object} e 
 * @param {String} e.message 可读性良好的错误信息
 * @param {String} e.filename 产生错误的脚本文件名
 * @param {String} e.lineno 发生错误时所在的脚本文件行号
 *  
 */

if (typeof (Worker) !== 'undefined') {


  // 开启一个子进程
  let w = new Worker('./worker.js')


  // 向子进程中发送数据
  w.postMessage({ name: 'mainLyle' })


  // 监听子进程传过来的数据
  w.onmessage = function (e) {
    console.log('监听子进程传过来的数据 ==>', e.data)
  }


  // 监听子进程发生的错误
  w.onerror = (e) => {
    console.log('错误原因 ==>', e)
  }


  // 关闭子进程
  // w.terminate()

} else {
  console.log('没有 Worker')
}

