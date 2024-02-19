private val EMAIL_REGEX = Regex("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9-.]+(\\s)*")

fun String.isValidEmail() = EMAIL_REGEX.matches(this) // 该处扩展了 String 类型的方法，添加了 isValidEmail 

fun main() {
  println("martians-so-do-not-exist@commonsware.com".isValidEmail())
  println("this is not an email address".isValidEmail())
}

/**
true
false


 */