fun <T> hasMatch(list: List<T>, predicate: (T) -> Boolean): Boolean {
  list.forEach { item ->
    if (predicate(item)) return true
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

传递函数进入，调用的时候，除了使用 xxx.invoke() 来调用的话，也可以使用 xxx() 来进行调用
 */