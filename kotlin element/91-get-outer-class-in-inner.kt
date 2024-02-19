class Foo {
  val count = 1

  inner class Bar {
    fun count() = count

    fun that() = this

    fun theOuterThis() = this@Foo
  }
}

fun main() {
  val foo = Foo()
  val bar = foo.Bar()

  println(bar.that()::class)
  println(bar.theOuterThis()::class)
}

/* 
class Bar
class Foo

内部 class 实例要拿取 外部实例 使用 this@XXX
 */