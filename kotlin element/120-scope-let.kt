fun main() {
  val one = 1

  one.let { println(it.dec()) }

  val maybeZero : Int? = null

  maybeZero?.let { println(it.dec()) }
}
/* 
0

let()  xxx.let 能够创建一个作用域函数进行执行，不受其他作用域的影响
 */