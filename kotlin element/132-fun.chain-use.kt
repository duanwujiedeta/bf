data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  val evenNegativeEvent = events.filter { it.id % 2 == 0 }.firstOrNull { it.id < 0 }

  println(evenNegativeEvent)
}

/* 
Event(id=-6)

高阶的函数可以链式调用，达到统一的输出
 */