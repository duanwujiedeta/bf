class Foo {
  fun something(messages: List<String>) {
    messages.forEach { message ->
      val length = message.length

      println("'$message' has $length characters")
    }
  }
}

fun main() {
  Foo().something(listOf("this", "is", "a", "test"))
}

/* 
'this' has 4 characters
'is' has 2 characters
'a' has 1 characters
'test' has 4 characters

lambda表达式有着它自己的作用域，不受其他的影响
 */