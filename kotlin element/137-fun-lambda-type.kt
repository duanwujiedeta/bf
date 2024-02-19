fun <T> hasMatch(list: List<T>, predicate: (T) -> Boolean): Boolean {
  list.forEach { item ->
    if (predicate.invoke(item)) return true
  }

  return false
}

data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  println(hasMatch(events) { it.id < 0 })
  println(hasMatch(events) { it.id > 100000 })
}


/* 
true
false

高阶函数如果传递 lambda 函数，可以用 invoke() 来进行调用
 */