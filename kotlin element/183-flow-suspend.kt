import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    flow {
      for (i in 0 until 10) {
        emit(randomPercentage(200))
      }
    }.collect { println(it) }
    println("That's all folks!")
  }

  println("...and we're off!")
}

suspend fun randomPercentage(delayMs: Long) = withContext(Dispatchers.Default) {
  delay(delayMs)
  Random.nextInt(1,100)
}

/* 
...and we're off!
3
52
81
95
75
82
87
30
29
7
That's all folks!

在 flow 的内部可以套嵌 emit ，使 flow 的执行在不同的 dispatcher 跳转；在 flow 体内，不能使用 withContext() ，否则会导致 编译报错。
 */