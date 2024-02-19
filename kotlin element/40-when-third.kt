fun thingyProvider() = "like, whatever"

fun main() {
  when (val thingy = thingyProvider()) {
    "foo" -> println("something")
    "bar" -> println("something else")
    else -> println("we received: $thingy")
  }
}

/* 
we received: like, whatever
 */

/* 
when 的表达式，还可以使用 函数的 调用值进行使用
  */