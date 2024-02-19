fun main() {
  var thing: String? = "foo"

  val nonNullResult = thing?.run { this.isNotBlank() }

  println(nonNullResult)

  thing = null

  val nullResult = thing?.run { this.isNotBlank() }

  println(nullResult)
}
/* 
true
null

run 也可以使用 ?. 来进行操作，防止 null 报错
 */