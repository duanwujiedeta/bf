fun main() {
  val things = listOf("foo", "bar", "goo")

  things
    .map { it.toUpperCase() }
    .forEach { println(it) }
}

/* 
FOO
BAR
GOO
 */