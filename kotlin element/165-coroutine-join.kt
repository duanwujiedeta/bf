import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val job = GlobalScope.launch(Dispatchers.Default) {
      delay(2000L)
      println("This is executed after the delay")
    }

    println("This is executed after calling launch()")

    job.join()

    println("This is executed after join()")
  }

  println("This is executed immediately")
}

/* 
This is executed immediately
This is executed after calling launch()
This is executed after the delay
This is executed after join()

job.join()  能够使得它后面的执行等在 launch 执行之后再执行
 */