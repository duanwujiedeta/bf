class Foo {
  var count = 0

  fun something() {
    count += 1
    println("something() was called $count times")
  }
}

fun main() {
  val foo = Foo()

  foo.something()
  foo.something()
  foo.something()

  println("the final count was ${foo.count}")
}

/* 
something() was called 1 times
something() was called 2 times
something() was called 3 times
the final count was 3

kotlin 类的函数方法或者属性直接在内部定义，定义之后，可以直接调用
 */