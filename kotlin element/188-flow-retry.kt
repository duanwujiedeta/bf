import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val myFlow = randomPercentages(10, 200)

    try {
      myFlow
        .retry(3)
        .collect { println(it) }
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
32
84
23
66
We crashed! RuntimeException: ick!
That's all folks

在 Flow 中，使用 retry() 表示当有 Exception 发生的时候，会重试 retry 参数里面的次数。
 */