import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() {
  val channel = Channel<Int>(0)
  
  GlobalScope.launch(Dispatchers.Main) {
    println("before receiving")
    println(channel.receive())
    println("after receiving")
  }
  
  GlobalScope.launch(Dispatchers.Default) {
    println("before sending")
    delay(2000)
    channel.send(123)
    println("after sending")
  }

  println("...and we're off!")
}
/* 
...and we're off!
before receiving
before sending
after sending
123
after receiving

这里我们通过Channel(0)设置了一个Channel，所以它没有缓冲区。我们的receive()调用会暂停，直到有一个相应的send()调用被执行。由于我们把send()的调用延迟了两秒，所以我们的receive()在这两秒内暂停了。
 */