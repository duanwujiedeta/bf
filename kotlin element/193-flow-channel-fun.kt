import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*
import kotlin.random.Random

fun main() {
  val channel = Channel<Int>(Channel.BUFFERED)
  
  GlobalScope.launch(Dispatchers.Default) {
    for (i in 0 until 10) {
      delay(200)
      channel.send(Random.nextInt(1,100))
    }
    
    channel.close()
  }
  
  GlobalScope.launch(Dispatchers.Main) {
    channel.consumeEach { println(it) }
    println("That's all folks!")
  }

  println("...and we're off!")
}
/* 
...and we're off!
32
97
41
52
64
25
88
22
28
22
That's all folks!

使用 Channel() 也可以创建 Channel ，它接受的参数：
· 0 表示 send() 应该阻塞，直到通道的消费者能够接收到对象；
· Channel.UNLIMITED 意味着 send() 总是立即返回，并且通道将缓冲对象直到可用内存的限制
· Channel.CONFLATED 意味着 send() 总是立即返回，但只有最后发送的对象被缓冲——所有之前的对象都丢失了
 */