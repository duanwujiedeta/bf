data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  val oneEvent = events.firstOrNull { it.id == 2343 } ?: Event(2343)

  println(oneEvent)
}
/* 
Event(id=2343)

firstOrNull 过滤的时候，如果为null，但是想要默认值，可以使用 (?:) 来进行使用
 */