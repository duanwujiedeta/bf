class Foo(sillyCount: String) {
  var count = sillyCount.toInt()

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


上述例子中，使用基于 初始化属性 来进行初始化 count
 */