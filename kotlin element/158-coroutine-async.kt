import kotlinx.coroutines.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val deferred = GlobalScope.async(Dispatchers.Default) {
      delay(2000L)
      println("This is executed after the delay")
      1337
    }

    println("This is executed after calling async()")

    val result = deferred.await()

    println("This is the result: $result")
  }

  println("This is executed immediately")
}

/* 
This is executed immediately
This is executed after calling async()
This is executed after the delay
This is the result: 1337


 */