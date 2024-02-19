class Foo(val sillyCount: String) {
  var count = 0

  init {
    count = sillyCount.toInt()
  }

  fun something() {
    count += 1
    println("something() was not called $count times")
  }
}


fun main() {
  val foo = Foo("7")

  foo.something()
  foo.something()
  foo.something()

  println("the final count was ${foo.count}")
}

/* 
something() was not called 8 times
something() was not called 9 times
something() was not called 10 times
the final count was 10
 */

/* 
kotlin 的构造函数可以没有 body 块的，它的 body 块被认为是 init ，所以 init 可以当成是 constructor 的进入点
 */