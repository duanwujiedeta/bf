import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val myFlow = randomPercentages(10, 200)

    try {
      myFlow.collect { println(it) }
    } catch (ex: Exception) {
      println("We crashed! $ex")
    }

    println("That's all folks!")
  }

  println("...and we're off!")
}

fun randomPercentages(count: Int, delayMs: Long) = flow {
  for (i in 0 until count) {
    delay(delayMs)
    emit(Random.nextInt(1,100))
    throw RuntimeException("ick!")
  }
}

/* 
...and we're off!
35
We crashed! RuntimeException: ick!
That's all folks!

在 Flow 内部抛出的 Exception ，你可以在 collect() 块中调用，try/catch 块来进行捕获。
 */