fun main() {
  val things = listOf("foo", "bar", "goo")

  things.forEach { println(it) }
}

/**
foo
bar
goo

对于  Array, List, and Set 都能使用 forEach 进行循环输出
 */