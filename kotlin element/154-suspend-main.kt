import kotlinx.coroutines.*

suspend fun main() {
  println("This is executed before the delay")
  stallForTime()
  println("This is executed after the delay")
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    delay(2000L)
  }
}

/* 
This is executed before the delay
This is executed after the delay

在 main 的函数使用 suspend 关键字，可以使得 main 的程序执行产生 协程。
 */