fun main() {
  val things = setOf(1, 3, 3, 7)

  println(things::class)
  println(things)
  println(things.size)
}

/* 
class LinkedHashSet
[1, 3, 7]
3

set 是不能重复的，当 equal(a == b) 的时候，第二次添加的就会被忽略
Set 构造函数创建的是不可变的，可变的需要使用 mutableSetOf 

https://klassbook.commonsware.com/lessons/Collections/map.html
 */