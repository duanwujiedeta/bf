import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    randomPercentages(10, 200)
      .collect { println(it) }
  }

  println("...and we're off!")
}

fun randomPercentages(count: Int, delayMs: Long) = flow {
  for (i in 0 until count) {
    delay(delayMs)
    emit(Random.nextInt(1,100))
  }
}
  .onEach { println("about to collect $it") }
  .onCompletion { println("That's all folks!") }
/* 
...and we're off!
about to collect 13
13
about to collect 70
70
about to collect 76
76
about to collect 28
28
about to collect 13
13
about to collect 61
61
about to collect 40
40
about to collect 53
53
about to collect 56
56
about to collect 64
64
That's all folks!

在 flow 的语句中使用监听，onEach() 是当 Flow emit 的时候调用，onCompletion() 是每条完成，当关闭后则不会执行
 */