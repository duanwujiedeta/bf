fun main() {
  val thingy = "bar"
  val otherThingy = "BAR"

  when (thingy) {
    "foo", "goo" -> println("something")
    otherThingy.toLowerCase() -> println("something else")
    else -> println("and now for something completely different")
  }
}

/* 
something else
 */

/* 
when 可以使用表达式进行比较输出
 */