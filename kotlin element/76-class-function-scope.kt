class Foo {
  fun something(message: String) {
    val length = message.length

    println("'$message' has $length characters")
  }
}

fun main() {
  Foo().something("this is a test")
}
/* 
'this is a test' has 14 characters


上面的 length 变量，该变量是一个局部变量（scope）
 */