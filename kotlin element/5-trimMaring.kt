fun main() {
  println("""Hello,
  world with extra whitespace!""")
  println("""Hello,
  >world using >!""".trimMargin(">"))
  println("""Hello,
  |world using |!""".trimMargin())
}

/* 
    trimMargin() // 如果不带参数的话，会用 "|" 作为默认参数
    它用来清除 参数边界 左右 的空白；
    输出：
Hello,
  world with extra whitespace!
Hello,
world using >!
Hello,
world using |!
 */