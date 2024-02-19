open class Foo {
  protected fun something() {
    println("Hello, world!")
  }
}

class Bar : Foo() {
  fun somethingElse() {
    something()
  }
}

fun main() {
  val notFoo = Bar()

  notFoo.somethingElse()
}
/* 
Hello, world!

protected 关键词定义的方法和属性，可以被子类所使用
 */