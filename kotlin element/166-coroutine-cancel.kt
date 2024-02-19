import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the first delay")
    stallForTime()
    println("This is executed after the first delay")
  }

  GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the second delay")
    job.cancel()
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
This is executed before the second delay
This is executed after the second delay

使用 job.cancel() 把协程后面等待的执行取消掉了
 */