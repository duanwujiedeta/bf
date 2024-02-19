import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    flow {
      for (i in 0 until 10) {
        delay(200)
        emit(Random.nextInt(1,100))
      }
    }
    .flowOn(Dispatchers.Default)
    .collect { println(it) }

    println("That's all folks!")
  }

  println("...and we're off!")
}
/* 
...and we're off!
59
40
97
88
48
81
12
83
2
31
That's all folks!

在 flow 内部使用 withContext() 的lambda表达式是 flowOn。
 */