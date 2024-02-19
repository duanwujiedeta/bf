import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    withTimeout(2000L) {
      println("This is executed before the delay")
      stallForTime()
      println("This is executed after the delay")
    }

    println("This is printed after the timeout")
  }

  println("This is executed immediately")
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    delay(10000L)
  }
}

/* 
This is executed immediately
This is executed before the delay

设置了 delay 后，标准情况下，delay 过期后，会执行后续的 协程，如果想让它在 某时间内 进行执行，过了时间则 cancel ，则可以使用 withTimeout 来进行设置
 */