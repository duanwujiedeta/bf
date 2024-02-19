fun main() {
  val thingy = "foo"

  when (thingy) {
    "foo" -> println("something")
    "bar" -> println("something else")
    else -> println("and now for something completely different")
  }
}

/* 
something
 */

/* 
when 可以使用任何值来进行对比，它使用 == 对比符号进行对比。
 */