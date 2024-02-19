class Foo(sillyCount: String) {
  var count: Int

  init {
    count = sillyCount.toInt()
  }

  fun something() {
    count += 1
    println("something() was called $count times")
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

something() was called 8 times
something() was called 9 times
something() was called 10 times
the final count was 10

属性不一定需要在定义的 body 块内进行定义，它可以在 init 方法里面进行定义，如上面的 count 属性
 */