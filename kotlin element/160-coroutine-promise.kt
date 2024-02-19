import kotlinx.coroutines.*

fun main() {
  GlobalScope.promise(Dispatchers.Default) {
    delay(2000L)
    println("This is executed after the delay")
    1337
  }.then { result ->
    println("This is the result: $result")
  }

  println("This is executed after calling promise()")
}
/* 
This is executed after calling promise()
This is executed after the delay
This is the result: 1337

和 javascript 那种 promise 差不多
 */