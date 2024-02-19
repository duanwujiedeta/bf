class Thingy {
  companion object {
    fun doSomething() {
      println("Ummm... is this something?")
    }
  }

  // TODO add other properties and functions
}

fun main() {
  Thingy.doSomething()
}

/* 
Ummm... is this something?

在 class 的内部，用 compaion object 定义一个 块 ，这个块里面的 fun 是顶部 类 的静态方法。
 */