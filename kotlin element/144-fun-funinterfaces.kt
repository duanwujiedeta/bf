fun interface Comparitizer<T> {
  fun valid(item: T): Boolean
}

fun <T> firstItemOrNull(items: Collection<T>, comparitizer: Comparitizer<T>): T? {
  items.forEach {
    if (comparitizer.valid(it)) return it
  }
  
  return null
}

data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  val leetEvent = firstItemOrNull(events, Comparitizer { it.id == 1337 })

  println(leetEvent)
}
/* 
Event(id=1337)

函数接口，语法需要谨记
 */