data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  println(events.first())// 没有参数的时候，默认第一个就返回 true
}

/* 
Event(id=1)

 */