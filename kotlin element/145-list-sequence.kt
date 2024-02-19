data class Event(val id: Int)

fun main() {
  val events = sequenceOf(Event(1), Event(-6), Event(5), Event(1337), Event(24601), Event(42))

  val evenNegativeEvent = events
    .map { it.id }
    .filter { it % 2 == 0 }
    .firstOrNull { it < 0 }

  println(evenNegativeEvent)
}
/* 
-6

链式调用会按顺序执行吗？ 有时间打印看看
 */