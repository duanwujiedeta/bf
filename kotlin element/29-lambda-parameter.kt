fun main() {
  val squarifier = { x: Int -> x * x }

  println(squarifier.invoke(3))
}

/*
9

lambda 表达式能够带有参数，参数直接塞入 invoke 方法中
 */