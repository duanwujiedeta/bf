fun main() {
  val three : Int? = 3

  println(three?.dec()?.dec()?.dec())

  val maybeZero : Int? = null

  println(maybeZero?.dec()?.dec()?.dec())
}


/* 
0
null

?. 能够用来链式调用，如果没有 null 的话，则正常返回结果，否则会返回 null
 */