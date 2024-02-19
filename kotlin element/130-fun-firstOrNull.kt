data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  val noEvent = events.firstOrNull { it.id == 2343 }

  println(noEvent)
}
/* 
null

first 在默认情况下，如果匹配不到会报错，使用 firstOrNull 则可以修复该问题，如果没有匹配到的情况下，则返回 null
 */