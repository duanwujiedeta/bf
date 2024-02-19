fun evenOrOddOrNull(value: Int?) {
  if (value != null) {
    if (value.rem(2) == 0) {
      println("Even!")
    }
    else {
      println("Odd!")
    }
  }
  else {
    println("Null!")
  }
}

fun main() {
  val one : Int? = 1

  evenOrOddOrNull(one)

  val maybeZero : Int? = null

  evenOrOddOrNull(maybeZero)
}
/* 
Odd!
Null!

在 if 的条件中，可以直接使用 != null 来进行判断变量是否为 null
 */