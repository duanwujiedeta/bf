class Foo(val rawLabel: String) {
  var count = 0
  val label: String by lazy { println("initializing via lazy!"); rawLabel.toUpperCase() }

  fun something() {
    count += 1
    println("$label: something() was called $count times")
  }
}

fun main() {
  val foo = Foo("foo")

  foo.something()
  foo.something()
  foo.something()

  println("the final count was ${foo.count}")
}

/* 
initializing via lazy!
FOO: something() was called 1 times
FOO: something() was called 2 times
FOO: something() was called 3 times
the final count was 3
 */

/* 
使用 by lazy 关键字来进行属性委托，该委托是一个 lambda 表达是，用来返回对应的值

 */