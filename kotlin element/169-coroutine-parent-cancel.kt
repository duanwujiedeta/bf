import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the delay")
    stallForTime()
    println("This is executed after the delay")
  }

  println("This is executed immediately")
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    println("This is executed at the start of the child job")

    var thisIsReallyNull: String? = null

    println("This will result in a NullPointerException: ${thisIsReallyNull!!.length}")

    delay(2000L)
    println("This is executed at the end of the child job")
  }
}
/* 
This is executed immediately
This is executed before the delay
This is executed at the start of the child job
NullPointerException

Coroutine 的子 协程 抛出异常之后，父级的 协程 也会被该异常所停止掉
 */