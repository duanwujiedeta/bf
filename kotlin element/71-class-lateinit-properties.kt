class Foo {
  var count = 0
  lateinit var label: String

  fun defineTag(tag: String) {
    label = tag
  }

  fun something() {
    count += 1
    println("$label: something() was called $count times")
  }
}

fun main() {
  val foo = Foo()

  foo.defineTag("Foo")
  foo.something()
  foo.something()
  foo.something()

  println("the final count was ${foo.count}")
}
/* 
Foo: something() was called 1 times
Foo: something() was called 2 times
Foo: something() was called 3 times
the final count was 3 */
/* 
使用 lateinit 定义的关键字，不需要在定义的时候就进行初始化，只需要在调用它之前进行初始化就行了，上面的 label 变量
 */