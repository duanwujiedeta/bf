import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    try {
      println("This is executed before the first delay")
      stallForTime()
      println("This is executed after the first delay")
    }
    finally {
      withContext(NonCancellable) {
        println("This is executed before the finally block delay")
        stallForTime()
        println("This is executed after the finally block delay")
      }
    }
  }

  GlobalScope.launch(Dispatchers.Main) {
    println("This is executed at the start of the second coroutine")
    job.cancelAndJoin()
    println("This is executed before the second delay")
    stallForTime()
    println("This is executed after the second delay")
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
This is executed before the first delay
This is executed at the start of the second coroutine
This is executed before the finally block delay
This is executed after the finally block delay
This is executed before the second delay
This is executed after the second delay

使用 try/finally 的 finally 块来进行使得 协程 执行完毕后，在 finally 块做最后的执行。
 */