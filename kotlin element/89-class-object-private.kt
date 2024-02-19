class Foo {
  private object Data {
    const val VALUE = 1
  }

  class Bar {
    fun value() = Foo.Data.VALUE

    // TODO add good stuff
  }

  // TODO add even more good stuff
}

fun main() {
  val bar = Foo.Bar()

  println(bar.value())
}

/* 
1

private 定义的 object 类型，也只能在 class 内部私有访问
 */