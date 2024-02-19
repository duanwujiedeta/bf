fun main() {
  println(expressionBody(1, 1))
}

fun expressionBody(left: Int, right: Int) = left + right

/* 
    输出：2
    简单函数的定义可以省略 （{}） 大括号，上面的函数会执行 = 后的表达式，并且会返回，kotlin 会自动检测返回类型，而不必定义返回类型
 */