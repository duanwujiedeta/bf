fun main() {
  val i = 3

  val message = when (i) {
    in 3..10 -> "something"
    in 1..2 -> "something else"
    else -> "and now for something completely different"
  }

  println(message)
}

/* 
something

把 when 的结果赋值给了一个变量
 */