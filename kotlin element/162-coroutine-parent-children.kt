import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("Job inside launch() context: ${coroutineContext[Job]}")
    stallForTime(coroutineContext[Job]!!)
    println("Job after stallForTime(): ${coroutineContext[Job]}")
    println("This is executed after the delay")
  }

  println("Job returned by launch(): ${job}")
}

suspend fun stallForTime(parent: Job) {
  withContext(Dispatchers.Default) {
    println("Job inside withContext() context: ${coroutineContext[Job]}")
    println("Parent job children: ${parent.children.joinToString()}") // 获取传入的 parent 的 children Coroutine
    delay(2000L)
  }
}

/* 
Job returned by launch(): StandaloneCoroutine{Active}@1
Job inside launch() context: StandaloneCoroutine{Active}@1
Job inside withContext() context: DispatchedCoroutine{Active}@2
Parent job children: DispatchedCoroutine{Active}@2
Job after stallForTime(): StandaloneCoroutine{Active}@1
This is executed after the delay
 */