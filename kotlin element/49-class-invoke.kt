class Foo {
  fun something() {
    println("Hello, world!")
  }
}

fun main() {
  val foo = Foo()

  foo.something()
}

/* 
Hello, world!

直接像调用函数一样生成实例，用 . 来进行方法调用
 */