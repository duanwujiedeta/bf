data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  println(events.any {
    println(it)

    it.id > 10
  })
}


/* 
Event(id=1)
Event(id=5)
Event(id=1337)
true

any 当遇到符合条件的情况下，则会停止循环，不再做后面的比较工作
 */