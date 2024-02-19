fun main() {
  val things = listOf("foo", "bar",123, "goo")

  println(things::class)
  println(things)
}

/* 
class ArrayList
[foo, bar, 123, goo]

说明：
listOf创建的列表是不能够修改，要创建能够修改的列表需要使用：. mutableListOf()

 */