data class Event(val id: Int)

fun main() {
  val events = listOf(Event(1), Event(5), Event(1337), Event(24601), Event(42), Event(-6))

  val joined = events.joinToString(",")

  println(joined)
}

/* 
Event(id=1),Event(id=5),Event(id=1337),Event(id=24601),Event(id=42),Event(id=-6)

joinToString 组合转换城字符串返回
 */