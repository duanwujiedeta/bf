fun main() {
  val things = arrayOf("foo", "bar", "goo")

  capped(*things).forEach { println(it) }
}

fun capped(vararg strings: String) = strings.map { it.toUpperCase() }

/* 
FOO
BAR
GOO
 */

 /* 
 使用 * 号能够将 list 传递给函数作为 vararg 的参数来进行使用
  */