fun main() {
  println(expressionBody(1, 1))
}

fun expressionBody(left: Int, right: Int) : Number = left + right

/* 
    输出：2
    有时候函数表达式的返回值类型不是你想象中一样的，所以要特别指定返回值的类型。
 */