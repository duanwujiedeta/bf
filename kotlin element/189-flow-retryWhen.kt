import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val myFlow = randomPercentages(10, 200)

    try {
      myFlow
        .retryWhen { ex, count -> count < 3 }
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
18
43
12
36
We crashed! RuntimeException: ick!
That's all folks!

retryWhen()方法，它使用一个 lambda 表达式（Exception,count），用 lambda 表达式的返回值来判断是否需要重试，如果返回 true ，则需要重试，如果返回 false，则不需要重试。
 */