fun <T> hasMatch(list: List<T>, predicate: (T) -> Boolean): Boolean {
  list.forEach { item ->
    if (predicate.invoke(item)) return true
  }

  return false
}

data class Event(val id: Int)

fun lessThanZero(event: Event) = event.id < 0

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  println(hasMatch(events, ::lessThanZero))
}

/* 
true

已定义的函数如果要作为参数传递给另外函数使用，用 ::XXXX 来进行传递
 */