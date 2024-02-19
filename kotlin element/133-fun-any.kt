data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  println(events.any { it.id < 0 })
  println(events.any { it.id > 100000 })
}

/* 
true
false

any 作为一个判断条件来使用
 */
