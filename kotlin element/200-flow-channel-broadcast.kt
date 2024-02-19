import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() {
  val channel = BroadcastChannel<Int>(4)
  
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
A: 456
A: 789
A: 1234
A: 5678

This is identical to the previous example... except that instead of Channel(), we use BroadcastChannel().

A BroadcastChannel() delivers each item to each active consumer at the time that the item is sent. So, in this case, with two active consumers, each of the five sent items is delivered to each of those two consumers.

这与前面的示例相同...除了我们使用 BroadcastChannel() 而不是 Channel()。

BroadcastChannel() 在发送项目时将每个项目交付给每个活动消费者。 因此，在这种情况下，有两个活跃的消费者，五个已发送的项目中的每一个都被交付给这两个消费者中的每一个。
 */