class Foo {
  var count = 0

  fun something() {
    this.count += 1
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


内部的属性页可以使用 this 来进行访问
 */