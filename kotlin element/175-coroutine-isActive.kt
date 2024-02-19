import kotlinx.coroutines.*
import kotlin.js.Date

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the first delay")
    stallForTime()
    println("This is executed after the first delay")
  }

  println("This is executed immediately")
}

suspend fun busyWait(ms: Int) {
  val start = Date().getTime().toLong()

  while ((Date().getTime().toLong() - start) < ms) {
    // busy loop
  }
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    coroutineContext[Job]!!.cancel()

    if (isActive) {
      println("This is executed before the busyWait(2000) call")
      busyWait(2000)
      println("This is executed after the busyWait(2000) call")
    }
  }
}

/* 
This is executed immediately
This is executed before the first delay

isActive 属性用来检查当前的 协程 状态，如果为 false，则该协程已经被取消了。
 */