import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the first delay")
    stallForTime()
    println("This is executed after the first delay")
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
This is executed before the second delay


This is executed after the second delay

cancelAndJoin()会占用协程,// 取消该作业并等待它结束

 */