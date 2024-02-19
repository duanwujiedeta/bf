data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  val leetEvent = events.first { it.id == 1337 }

  println(leetEvent)
}

/* 
Event(id=1337)

listOf 的 first 可以过滤第一个符合条件的作为返回值
 */