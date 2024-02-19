import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    randomPercentages(10, 200)
      .onStart { emit(1337) }
      .collect { println(it) }
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
1337
94
71
63
19
50
31
5
71
16
98
That's all folks!

Flow 含有一个 onStart() 的方法，它在 Flow 开始执行 emit 之前调用，onStart 的 lambda 表达式中，会被传入一个 FlowCollector ,FlowCollector 含有一个 emit 函数。
 */