import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() {
  val channel = Channel<Int>(4)
  
  GlobalScope.launch(Dispatchers.Main) {
    println("A: before receiving")
    channel.consumeEach { println("A: $it") }
    println("A: after receiving")
  }
  
  GlobalScope.launch(Dispatchers.Main) {
    println("B: before receiving")
    channel.consumeEach { println("B: $it") }
    println("B: after receiving")
  }
  
  GlobalScope.launch(Dispatchers.Default) {
    println("before first send")
    channel.send(123)
    println("before second send")
    channel.send(456)
    println("before third send")
    channel.send(789)
    println("before fourth send")
    channel.send(1234)
    println("before fifth send")
    channel.send(5678)
    println("after sending all")
    delay(100)
    channel.close()
  }

  println("...and we're off!")
}


/* 
...and we're off!
A: before receiving
B: before receiving
before first send
before second send
before third send
before fourth send
before fifth send
after sending all
A: 123
A: 789
A: 1234
A: 5678
B: 456

Once again, we have a Channel set up via Channel(4), so it has a four-element buffer.

This time, we have two separate coroutines set up to consume items off of the channel. In a regular channel, each sent item is delivered to exactly one consumer. If you run this, you should find the five sent items are each delivered exactly once, split between the two consumers.

再一次，我们通过 Channel(4) 设置了一个 Channel，因此它有一个四元素缓冲区。

这一次，我们设置了两个独立的协程来消费通道外的项目。 在常规渠道中，每个发送的项目都只交付给一个消费者。 如果你运行这个，你应该会发现五个发送的项目每个都恰好发送一次，在两个消费者之间分配。
 */