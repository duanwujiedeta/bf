fun main() {
  val stuff = mapOf("something" to 1337, "somethingElse" to "like, whatever")
  val something: Int by stuff
  val somethingElse: String by stuff

  println(something)
  println(somethingElse)
}

/* 
1337
like, whatever

可以使用 by 的委托到 Map 的属性来进行拿取
 */