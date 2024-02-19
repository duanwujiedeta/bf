fun main() {
  val i = 3

  when (i) {
    in 3..10 -> println("something")
    in 1..2 -> println("something else")
    else -> println("and now for something completely different")
  }
}
/* 
something
 */

/* 
when 可以使用 ranges (.. notion) 来进行条件范围判断
 */