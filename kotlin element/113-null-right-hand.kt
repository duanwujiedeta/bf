fun main() {
  val one : Int? = 1

  println(one ?: "um, this should not be printed")

  val maybeZero : Int? = null

  println(maybeZero ?: "Elvis has not left the building")
}

/* 
1
Elvis has not left the building


one ?: "um, this should not be printed"  表达式中，如果 one 为 null ，则返回右侧的字符串，如果 one 不为 null ,则返回 one 的值
 */