import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    randomPercentages(10, 200).collect { println(it) }
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
47
29
85
94
18
57
10
73
76
46
That's all folks!


用 flow 来生成一系列任务，使用 Flow.collect 来进行消费
flow 带着 lambda 表达式来建立任务， Flow.collect 用来收集  flow 体内的 emit 执行返回作为参数使用
 */