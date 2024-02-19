class Foo(var count: Int) : Any() {
  fun something() {
    count += 1
    println("something() was called $count times")
  }
}

fun main() {
  val foo = Foo(0)

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

要添加一个超类，在你的类的主构造函数之后放置一个 对其构造函数的调用 ，用:分隔。
 */


