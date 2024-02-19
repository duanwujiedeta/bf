typealias StringMap = Map<String, String> // 当以了新的类型来作为参数类型
typealias StringPair = Pair<String, String>
typealias Pairmonger = (String, String) -> StringPair

fun collectify(input: StringMap, transform: Pairmonger): List<StringPair> {
  val result = mutableListOf<StringPair>()

  for ((key, value) in input) { result.add(transform(key, value)) }

  return result.toList()
}

fun main() {
  val stuff = mapOf("foo" to "bar", "goo" to "baz")

  println(stuff)
  println(collectify(stuff) { key, value -> key to value } )
}
/* 
{foo=bar, goo=baz}
[(foo, bar), (goo, baz)]

typealias 用来定义新的数据类型
 */