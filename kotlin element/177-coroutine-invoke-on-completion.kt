import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    withTimeout(2000L) {
      println("This is executed before the delay")
      stallForTime()
      println("This is executed after the delay")
    }
  }

  job.invokeOnCompletion { cause -> println("We were canceled due to $cause") }

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
We were canceled due to TimeoutCancellationException: Timed out waiting for 2000 ms

invokeOnCompletion ， 注册一个 lambda 表达式 当 job 执行完毕 或者 其他原因，lambda 表达式的参数：
1、null ，如果 job 正常完成；
2、一个 CancellationException ，如果 job 被取消；
3、其他的 exception ，如果 job 失败。
 */