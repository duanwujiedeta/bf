open class Base(open val tag: String/* 带有 open 关键字定义的 tag */) {
  open fun gimmeTheTag() = tag
}

open class Intermezzo(override val tag: String/* 重写了参数，不知道有什么用 */) : Base(tag)

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
