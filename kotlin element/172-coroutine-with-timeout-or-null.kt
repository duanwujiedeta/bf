import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val result = withTimeoutOrNull(2000L) {
      println("This is executed before the delay")
      stallForTime()
      println("This is executed after the delay")
      "hi!"
    }

    println("This is the result: $result")
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

This is the result: null

使用 withTimeoutOrNull() 来定义延时，如果延时有正常处理，则正常返回，不然则返回 null
 */