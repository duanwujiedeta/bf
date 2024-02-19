class Foo {
  inner class Bar {
    fun that() = this
  }
}

fun main() {
  val foo = Foo()
  val bar = foo.Bar()

  println(bar.that()::class)
}

/* 
class Bar

对于内部函数的调用，this 指向内部的那个函数s
 */