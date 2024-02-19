class Foo(val count: Int)

fun main() {
  val instanceOne = Foo(1)
  val instanceTwo = Foo(2)

  println(instanceOne.count)
  println(instanceTwo.count)
}
/* 
1
2

每一个实例都有对应的作用域，每个实例之间的值互不影响
 */