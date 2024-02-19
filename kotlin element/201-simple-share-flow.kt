import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun randomSharedFlow(): Flow<Int> {
  val sharedFlow = MutableSharedFlow<Int>()
  
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
    sharedFlow.collect { println("Collector B: $it") }
    println("That's all folks!")
  }

  println("...and we're off!")
}

/* 
...and we're off!
Collector A: 12
Collector B: 12
Collector A: 46
Collector B: 46
Collector A: 92
Collector B: 92
Collector A: 1
Collector B: 1
Collector A: 8
Collector B: 8
Collector A: 81
Collector B: 81
Collector A: 12

SharedFlow and MutableSharedFlow were added to coroutines with version 1.4.0. A SharedFlow is a hot flow (one that can exist outside of any subscribers) that can be consumed by multiple subscribers.

The holder of a SharedFlow can use Flow-like constructs to observe the flow (e.g., collect()).

The typical way to set up a SharedFlow is to use a MutableSharedFlow. You can call emit() on the MutableSharedFlow to send a value to all current subscribers.

Here, we set up a MutableSharedFlow that will emit 10 random numbers. And, we set up two subscribers to that flow. Both subscribers will collect the same set of random values, since they are both observing the same flow.


SharedFlow 和 MutableSharedFlow 已添加到 1.4.0 版本的协程中。 SharedFlow 是一个热流（可以存在于任何订阅者之外），可以被多个订阅者消费。

SharedFlow 的持有者可以使用类似流的构造来观察流（例如，collect()）。

设置 SharedFlow 的典型方法是使用 MutableSharedFlow。 您可以在 MutableSharedFlow 上调用 emit() 以向所有当前订阅者发送一个值。

在这里，我们设置了一个 MutableSharedFlow，它将发出 10 个随机数。 而且，我们为该流程设置了两个订阅者。 两个订阅者将收集同一组随机值，因为他们都在观察相同的流。
 */