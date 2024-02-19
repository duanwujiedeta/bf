class Foo(sillyCount: String) {
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
上述 class 中，class 参数没有使用 var、val 来进行定义，因此实例化的时候，传入的参数只能被 init 所访问到，其它方法无法访问
 */