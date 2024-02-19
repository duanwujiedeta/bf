import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() {
  val channel = Channel<Int>(4)
  
  GlobalScope.launch(Dispatchers.Main) {
    delay(2000)
    println("before receiving")
    channel.consumeEach { println(it) }
    println("after receiving")
    channel.close()
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
  }

  println("...and we're off!")
}
/* 
...and we're off!
before first send
before second send
before third send
before fourth send
before fifth send
before receiving
123
456
789
1234
5678
after sending all

这里我们通过 Channel(4) 设置了一个 Channel，因此它有一个四元素缓冲区。
这一次，我们在接收逻辑上使用 delay() 。我们尝试使用 send() 五次，前四次被立即处理，但第五次暂停，因为我们已经用完了缓冲区空间。只有在我们开始使用通道中的对象后，我们的第五个 send() 才能完成。
 */