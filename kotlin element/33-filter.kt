fun main() {
  val things = listOf("foo", "bar", "goo")

  things.filter { it[1]=='o' }.forEach { println(it) }
}

/* 
foo
goo

很多的 collections 都有 filter 函数
 */