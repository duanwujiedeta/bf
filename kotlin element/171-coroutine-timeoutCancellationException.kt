import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    try {
      withTimeout(2000L) {
        println("This is executed before the delay")
        stallForTime()
        println("This is executed after the delay")
      }
    } catch (e: TimeoutCancellationException) {
      println("We got a timeout exception")
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


We got a timeout exception
This is printed after the timeout
后面两条延时后再执行

withTimeout() 会引发 TimeoutCancellationException ，避免这种 Exception ，需要使用 try/catch 来捕获 TimeoutCancellationException 报错
 */