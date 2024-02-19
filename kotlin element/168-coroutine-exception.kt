import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the first delay")
    stallForTime()
    println("This is executed after the first delay")
  }

  GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the second delay")

    var thisIsReallyNull: String? = null

    println("This will result in a NullPointerException: ${thisIsReallyNull!!.length}")

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
NullPointerException
This is executed after the first delay


遇到 Exception 的时候， coroutine 会被停止，如果没有处理异常
 */