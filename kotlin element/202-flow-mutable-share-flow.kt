import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun randomSharedFlow(): Flow<Int> {
  val sharedFlow = MutableSharedFlow<Int>(replay = 2)
  
  GlobalScope.launch(Dispatchers.Default) {
    for (i in 0 until 10) {
      sharedFlow.emit(Random.nextInt(1,100))
      delay(200)
    }
  }
  
  return sharedFlow
}

fun main() {
  val sharedFlow = randomSharedFlow()
  
  GlobalScope.launch(Dispatchers.Main) {
    sharedFlow.collect { println("Collector A: $it") }
    println("That's all folks!")
  }

  GlobalScope.launch(Dispatchers.Main) {
    delay(1000)
    sharedFlow.collect { println("Collector B: $it") }
    println("That's all folks!")
  }

  println("...and we're off!")
}

/* 
...and we're off!
Collector A: 39
Collector A: 11
Collector A: 47
Collector A: 35
Collector A: 59
Collector B: 35
Collector B: 59
Collector A: 50
Collector B: 50
Collector A: 11
Collector B: 11
Collector A: 31
Collector B: 31
Collector A: 43
Collector B: 43
Collector A: 70
Collector B: 70


The MutableSharedFlow() factory function has an optional replay parameter. This indicates how many objects should be cached by the flow and delivered to late subscribers. The default is 0, so nothing gets cached this way.

Here, we have the same random-numbers SharedFlow from before, except that replay is set to 2. Also, the "B" subscriber delays its collect() call by one second. The result is that our MutableSharedFlow will emit five objects before "B" subscribes. Due to the replay value, though, "B" will immediately get the last two of those five objects. After that, "B" gets the same objects as "A" and at approximately the same time.

MutableSharedFlow() 工厂函数有一个可选的 replay 参数。 这表示流应缓存多少对象并将其交付给迟到的订阅者。 默认值为 0，因此不会以这种方式缓存任何内容。

在这里，我们有与之前相同的随机数 SharedFlow，只是 replay 设置为 2。此外，“B”订阅者将其 collect() 调用延迟一秒。 结果是我们的 MutableSharedFlow 将在“B”订阅之前发出五个对象。 但是，由于重播值，“B”将立即获得这五个对象中的最后两个。 之后，“B”获得与“A”相同的对象，并且几乎在同一时间。
 */