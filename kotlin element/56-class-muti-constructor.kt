class Foo(var count: Int) {

  constructor(sillyCount: String) : this(sillyCount.toInt()) {
    // could have code here if needed
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


kotlin 可以有两个构造函数，constructor、init 分别先后执行
 */