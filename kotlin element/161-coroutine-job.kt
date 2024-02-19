import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("Job inside launch() context: ${coroutineContext[Job]}")
    stallForTime()
    println("This is executed after the delay")
  }

  println("Job returned by launch(): ${job}")
}

suspend fun stallForTime() {
  withContext(Dispatchers.Default) {
    println("Job inside withContext() context: ${coroutineContext[Job]}")
    delay(2000L)
  }
}

/* 
Job returned by launch(): StandaloneCoroutine{Active}@1
Job inside launch() context: StandaloneCoroutine{Active}@1
Job inside withContext() context: DispatchedCoroutine{Active}@2
This is executed after the delay

 GlobalScope.launch 能够返回状态，withContext 的 lambda 内部可以使用 coroutineContext[Job] 来拿取当前的 job 
 */