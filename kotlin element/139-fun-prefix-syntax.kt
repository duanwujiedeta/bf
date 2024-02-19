data class Event(val id: Int)

class Thingy {
  fun <T> hasMatch(list: List<T>, predicate: (T) -> Boolean): Boolean {
    list.forEach { item ->
      if (predicate.invoke(item)) return true
    }

    return false
  }

  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  fun lessThanZero(event: Event) = event.id < 0

  fun matchify() {
    println(hasMatch(events, ::lessThanZero))
  }
}

fun main() {
  Thingy().matchify()
}
/* 
true

类的内部以函数作为参数的话，也可以使用 ::XXX 来进行传递
 */