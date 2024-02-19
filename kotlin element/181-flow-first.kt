import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    println("received ${randomPercentages(100, 200).first()}")
    println("That's all folks!")
  }

  println("...and we're off!")
}

fun randomPercentages(count: Int, delayMs: Long) = flow {
  for (i in 0 until count) {
    delay(delayMs)

    val value = Random.nextInt(1,100)

    println("emitting $value")
    emit(value)
  }
}

/* 
...and we're off!
emitting 2
received 2
That's all folks!

first() 返回其中一个 flow，之后就会取消 订阅 flow，就算 flow 有多个返回，也不会有报错生成。
 */