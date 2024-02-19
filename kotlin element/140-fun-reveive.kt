fun <T> hasMatch(list: List<T>, predicate: (T) -> Boolean): Boolean {
  list.forEach { item ->
    if (predicate.invoke(item)) return true
  }

  return false
}

data class Event(val id: Int)

class Thingy {
  fun lessThanZero(event: Event) = event.id < 0
}

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))
  val thingy = Thingy()

  println(hasMatch(events, thingy::lessThanZero))
}

/* 
true

一个实例的方法作为传递，使用 instance::XXXX
 */