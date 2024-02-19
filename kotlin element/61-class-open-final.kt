open class Base(val tag: String) {
  open fun gimmeTheTag() = tag
}

open class Intermezzo(val thing: String) : Base(thing)

class Foo(var count: Int) : Intermezzo("Foo Example") {
  override fun gimmeTheTag() = "Not the Original Tag"

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
Not the Original Tag: something() was called 1 times
Not the Original Tag: something() was called 2 times
Not the Original Tag: something() was called 3 times
the final count was 3
 */

/* 
带有 open 关键字的类方法可以被重写，重写的子类中，如果使用 final 进行定义，则不能被 子子 类进行重写了
 */