open class Base(val tag: String) {
  fun gimmeTheTag() = tag
}

class Foo(var count: Int) : Base("Foo Example") {
  fun something() {
    count += 1
    println("${gimmeTheTag()}: something() was called $count times")
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
上面例子，从父类调用 gimmeTheTag 方法
 */