import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    randomPercentages().collect { println(it) }
    println("That's all folks!")
  }

  println("...and we're off!")
}

fun randomPercentages() =
  flowOf(Random.nextInt(1,100), Random.nextInt(1,100), Random.nextInt(1,100))

/* 
...and we're off!
67
77
80
That's all folks!

flowOf() 创建一个 Flow，它发出您传递给 flowOf() 的对象。
 */