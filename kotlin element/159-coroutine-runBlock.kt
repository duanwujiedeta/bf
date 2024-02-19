import kotlinx.coroutines.*

fun main() {
  println("This is executed immediately")

  runBlocking {
    stallForTime()
    println("This is executed after the delay")
  }

  println("This is executed after runBlocking returns")
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    delay(2000L)
  }
}

/* 
该程序报错了，查资料再看
 */