import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    println(randomPercentages(10, 200).toList())
    println("That's all folks!")
  }

  println("...and we're off!")
}

fun randomPercentages(count: Int, delayMs: Long) = flow {
  for (i in 0 until count) {
    delay(delayMs)
    emit(Random.nextInt(1,100))
  }
}

/* 
...and we're off!
[63, 24, 68, 35, 93, 82, 41, 64, 45, 88]
That's all folks!

在flow中，调用 toList() 会返回一个 list，调用 toSet 会返回一个 Set。
 */