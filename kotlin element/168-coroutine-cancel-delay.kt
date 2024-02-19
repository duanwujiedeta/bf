import kotlinx.coroutines.*

fun main() {
  val job = GlobalScope.launch(Dispatchers.Main) {
    println("This is executed before the delay")
    stallForTime(coroutineContext[Job]!!)
    println("This is executed after the delay")
  }

  println("This is executed immediately")
}

suspend fun stallForTime(parent: Job) {
  withContext(Dispatchers.Default) {
    println("This is executed at the start of the child job")
    parent.cancel()
    println("This is executed after canceling the parent") // 这条会打印出来
    delay(2000L) // 做了 delay 延时的能够确保后面的都不会打印出来
    println("This is executed at the end of the child job")
  }
}

/* 
This is executed immediately
This is executed before the delay
This is executed at the start of the child job
This is executed after canceling the parent

 */