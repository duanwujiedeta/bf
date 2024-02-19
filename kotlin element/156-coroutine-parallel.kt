import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the first delay")
    stallForTime()
    println("This is executed after the first delay")
  }

  GlobalScope.launch(Dispatchers.Main) {
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
This is executed before the second delay

This is executed after the first delay
This is executed after the second delay

最后两条几乎同时打印，是并行进行的
 */