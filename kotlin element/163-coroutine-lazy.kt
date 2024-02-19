import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main, start = CoroutineStart.LAZY) {
    stallForTime()
    println("This is executed after the delay")
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

GlobalScope.launch 它含有一个选项参数 start ，设置为 CoroutineStart.LAZY 后，协程就不会被执行（应该有方法来触发的）
 */