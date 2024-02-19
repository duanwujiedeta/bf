fun main() {
  val i = 3

  when {
    i > 10 -> println("something")
    i > 2 -> println("something else")
    else -> println("and now for something completely different")
  }
}

/* 
something else
 */

/* 
when 还可以直接使用比较进行结果的输出，如上面 demo
 */