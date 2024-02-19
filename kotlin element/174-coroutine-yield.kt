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
    yield()
  }
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    coroutineContext[Job]!!.cancel()
    println("This is executed before the busyWait(2000) call")
    busyWait(2000)
    println("This is executed after the busyWait(2000) call")
  }
}

/* 
This is executed immediately
This is executed before the first delay
This is executed before the busyWait(2000) call

yield() 把当前 协程 挂起而切换到其他的 协程，如果没有其他协程，则会报 CancellationException 。
 */