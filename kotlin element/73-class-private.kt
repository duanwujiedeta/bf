class Foo {
  private fun something() {
    println("Hello, world!")
  }

  fun somethingElse() {
    something()
  }
}

fun main() {
  val foo = Foo()

  foo.somethingElse()
}
/* 
Hello, world!

private 定义的只能 类 内部进行调用
 */