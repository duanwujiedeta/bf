fun main() {
  val thingy = "foo"

  when (thingy) {
    "foo", "goo" -> println("something")
    "bar", "baz", "frobozz" -> println("something else")
    else -> println("and now for something completely different")
  }
}

/* 
something
 */

/* 
when 可以多个值在一个条件进行判断
 */