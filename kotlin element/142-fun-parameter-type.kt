fun <K, V, T> collectify(input: Map<K, V>, transform: (K, V) -> T): List<T> {
  val result = mutableListOf<T>()

  for ((key, value) in input) { result.add(transform(key, value)) }

  return result.toList()
}

fun main() {
  val stuff = mapOf("foo" to "bar", "goo" to "baz")

  println(stuff)
  println(collectify(stuff) { key, value -> "${key.toUpperCase()}: ${value.toUpperCase()}" } )
}

/* 
{foo=bar, goo=baz}
[FOO: BAR, GOO: BAZ]

泛型的不同类型可以使用 <K,V,T> 来进行使用
 */