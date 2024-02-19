class Foo {
  class Bar {
    fun whatever() {
      println("You were expecting something profound?")
    }

    // TODO add good stuff
  }

  // TODO add even more good stuff
}

fun main() {
  val bar = Foo.Bar()

  bar.whatever()
}

/* 
You were expecting something profound?

对于创建在 class 内部的 class，直接使用 . 从外部进行引用使用
 */