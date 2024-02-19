class Foo constructor(var count: Int) {
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
 */

/* 
上面使用了 constructor ，它直接被定义在了 类名之后
 */