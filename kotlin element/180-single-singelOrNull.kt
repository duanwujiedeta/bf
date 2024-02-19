import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlin.random.Random

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    println(randomPercentage().single())
    println("That's all folks!")
  }

  println("...and we're off!")
}

fun randomPercentage() = flow {
  emit(Random.nextInt(1,100))
}

/* 
...and we're off!
89
That's all folks!

如果你在一个Flow上调用single()，它将返回该Flow发出的第一个对象。但是，如果Flow发射了一个以上的对象，或者如果Flow在发射第一个对象之前被关闭，single()将抛出一个异常。

singleOrNull()如果Flow在发射第一个对象之前被关闭，则返回null。然而，和single()一样，如果Flow被设置为发射多个对象，它会抛出一个异常。
 */