import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main, start = CoroutineStart.LAZY) {
    stallForTime()
    println("This is executed after the delay")
  }

  println("This is executed immediately")

  job.start()

  println("This is executed after starting the job")
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    delay(2000L)
  }
}

/* 
This is executed immediately
This is executed after starting the job
This is executed after the delay

使用 job.start() 来进行启动协程
 */