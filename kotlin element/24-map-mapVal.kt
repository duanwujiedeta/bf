fun main() {
  val things = mapOf("odd" to listOf(1, 3, 5, 7, 9), "even" to listOf(2, 4, 6, 8))

  println(things::class)
  println(things)
  println(things.size)
}
/* 
class LinkedHashMap
{odd=[1, 3, 5, 7, 9], even=[2, 4, 6, 8]}
2

map 的 value 可以是其他数据类型
 */