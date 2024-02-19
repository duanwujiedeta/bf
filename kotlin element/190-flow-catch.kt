import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val myFlow = randomPercentages(10, 200)

    myFlow
      .catch { println("We crashed! $it") }
      .collect { println(it) }

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
92
We crashed! RuntimeException: ick!
That's all folks!

使用 Flow.catch 可以捕获来自 前面 flow 和 关闭的 flow 的异常。
 */