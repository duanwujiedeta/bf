private val EMAIL_REGEX = Regex("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9-.]+(\\s)*")

fun String?.isValidEmail() = this?.let { EMAIL_REGEX.matches(this) } ?: false //  此处的定义扩展方法，使得它能够兼容 null 的值

fun main() {
  println("martians-so-do-not-exist@commonsware.com".isValidEmail())
  println("this is not an email address".isValidEmail())
  println(null.isValidEmail())
}
/* 
true
false
false

 */