import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    val channel = randomPercentages(10, 200)

    delay(1000)
    channel.consumeEach { println(it) }
    println("That's all folks!")
  }

  println("...and we're off!")
}

fun CoroutineScope.randomPercentages(count: Int, delayMs: Long) = produce {
  for (i in 0 until count) {
    delay(delayMs)
    offer(Random.nextInt(1,100))
  }
}

/* 
...and we're off!
89
4
3
29
47
80
That's all folks!

offer 和 send 不同的是，offer 不会阻塞，如果不能给到 Channel，则直接取消放弃；send 会阻塞等待。
 */