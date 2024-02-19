open class Base(val tag: String) {
  open fun gimmeTheTag() = tag
}

class Foo(var count: Int) : Base("Foo Example") {
  override fun gimmeTheTag() = super.gimmeTheTag() + "-Extended"

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
Foo Example-Extended: something() was called 1 times
Foo Example-Extended: something() was called 2 times
Foo Example-Extended: something() was called 3 times
the final count was 3 */

/* 
使用 super 来访问父类的方法
 */