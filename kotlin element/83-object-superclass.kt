open class Base {
  // TODO stuff here
}

object Transmogrifier : Base() {
  fun transmogrify() {
    println("Presto, change-o!")
  }
}

fun main() {
  Transmogrifier.transmogrify()
}


/* 
Presto, change-o!

对于 Object 的单例，它也可以继承 类，达到相关的继承
 */