import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {// 启动一个协程，当主线程结束后，就会来协程调用
    println("This is executed before the delay")
    stallForTime()// 该处启用暂停，等待 2 秒后再进行后续的调用
    println("This is executed after the delay")
  }

  println("This is executed immediately")
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    delay(2000L)
  }
}

/* 
This is executed immediately
This is executed before the delay
This is executed after the delay

Coroutines(协程), 计算机程序组件, 通过允许任务挂起和恢复执行, 来支持非抢占式的多任务. 协程主要是为了异步, 非阻塞的代码. 
suspend 关键字很关键
GlobalScope.launch   suspend   withContext    Dispatchers.Main   Dispatchers.Default
 */