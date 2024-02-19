fun foo(message: String?) {
  println(message.isNullOrEmpty())
}

fun main() {
  foo("Hello, world!")
  foo("")
  foo(null)
}


/* 
false
true
true

"" 和 null 都表示为 null
 */