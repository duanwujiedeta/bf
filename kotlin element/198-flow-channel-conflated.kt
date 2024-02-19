import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() {
  val channel = Channel<Int>(Channel.CONFLATED)
  
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
after sending all
before receiving
5678

Here we have a conflated Channel. Such a channel has a one-element buffer, but rather than suspending send() calls if the buffer is full, conflation replaces the contents of the buffer by subsequent send() calls. As a result, since our five send() calls are likely to take less than two seconds, we only consume the last value (5678) rather than all five.

这里我们有一个合并的频道。 这样的通道有一个单元素缓冲区，但不是在缓冲区已满时暂停 send() 调用，而是通过后续的 send() 调用替换缓冲区的内容。 因此，由于我们的五个 send() 调用可能花费不到两秒，因此我们只使用最后一个值 (5678) 而不是全部五个。
 */