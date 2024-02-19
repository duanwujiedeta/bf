fun printOrNot(value: Int?) {
  val nonNullable = value ?: return

  println(nonNullable)
}

fun main() {
  val one : Int? = 1

  printOrNot(one)

  val maybeZero : Int? = null

  printOrNot(maybeZero)
}

/* 
1

value ?: return  标识 value 为 null 的时候，直接返回
 */