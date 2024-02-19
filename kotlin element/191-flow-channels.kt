import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    randomPercentages(10, 200).consumeEach { println(it) }
    println("That's all folks!")
  }

  println("...and we're off!")
}

fun CoroutineScope.randomPercentages(count: Int, delayMs: Long) = produce {
  for (i in 0 until count) {
    delay(delayMs)
    send(Random.nextInt(1,100))
  }
}

/* 
...and we're off!
83
6
71
52
22
89
35
51
78
65
That's all folks!

Channel 的创建方式是在 协程 的作用域上使用 produce() ，它接受一个 lambda 表达式，在lambda 表达式内部使用 send() 来把它们塞入 流 中。
 */