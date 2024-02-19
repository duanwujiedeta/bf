fun main() {
  println(increment(base = 1))
  println(increment(amount = 10, base = 1))
  println(increment(1, amount = 10))
}

fun increment(base: Int, amount: Int = 1) = base + amount

/* 
    输出：
    2
    11
    11

kotlin支持命名的参数，这样可以避免参数顺序问题
 */