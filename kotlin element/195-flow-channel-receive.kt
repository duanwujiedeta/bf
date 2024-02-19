import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    println(randomPercentages(10, 200).receive())
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
63
That's all folks!

在通道上调用的 receive() 将暂停，直到有可用的对象，然后返回该对象。
 */