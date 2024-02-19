import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    println(randomPercentages(10, 200).toList())
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
[23, 24, 36, 22, 99, 60, 93, 53, 34, 88]
That's all folks!

toList() 给你一个 channel 的 list ，如果您在通道关闭之前无法对通道输出执行任何操作，这将很有帮助。
 */