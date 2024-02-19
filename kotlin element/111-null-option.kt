fun main() {
  val one : Int? = 1

  println(one?.dec())

  val maybeZero : Int? = null

  println(maybeZero?.dec())
}


/* 
0
null

一个变量可以为正常类型，也可能为null，one?.dec() 表示如果是正常类型的话，则正常类型的返回，如果 one 是 null ，则上面的表达式返回 null

 */