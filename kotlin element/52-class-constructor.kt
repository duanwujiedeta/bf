class Foo(var count: Int) {
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


带有参数的 class 和 fun 是不同的，它的参数可以使用 var 或 val 来进行定义，定义了之后，表示这个参数是暴露给了 class 的其余部分去访问
 */