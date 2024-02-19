open class Base(val tag: String) {
  open fun gimmeTheTag() = tag
}

class Foo(var count: Int) : Base("Foo Example") {
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

父类的方法中，含有 open 关键字的方法才能够被重写，没有 open 关键字的，是不能够被子类重写的
 */