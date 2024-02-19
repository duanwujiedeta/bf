fun main() {
  val thingsArray = arrayOf("foo", "bar", "goo")

  println(thingsArray[0])

  val thingsIntArray = intArrayOf(1, 3, 3, 7)

  println(thingsIntArray[1])

  val thingsList = listOf("foo", "bar", "goo")

  println(thingsList[2])

  val thingsMap = mapOf("key" to "value", "other-key" to "other-value")

  println(thingsMap["other-key"])
}

/* 
foo
3
goo
other-value

使用 [] 语法来进行获取元素
map 的需要添加 对应的 key 字符串
 */