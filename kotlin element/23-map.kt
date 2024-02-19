fun main() {
  val things = mapOf("key" to "value", "other-key" to "other-value")

  println(things::class)
  println(things)
  println(things.size)
}

/* 
class LinkedHashMap
{key=value, other-key=other-value}
2
 */