fun main() {
  val one = 1

  println(one.let { it.dec() })

  val maybeZero : Int? = null

  println(maybeZero?.let { it.dec() })
}

/* 
0
null

let()  表达式能够产生返回值，看上面例子
 */