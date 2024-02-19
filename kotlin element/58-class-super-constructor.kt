open class Base(val tag: String)

class Foo(var count: Int) : Base("Foo Example") {
  fun something() {
    count += 1
    println("$tag: something() was called $count times")
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
Foo Example: something() was called 1 times
Foo Example: something() was called 2 times
Foo Example: something() was called 3 times
the final count was 3
 */

/* 
class Foo(var count: Int) : Base("Foo Example")  用父类的调用来进行初始化 tag 属性
 */