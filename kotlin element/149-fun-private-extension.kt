private val EMAIL_REGEX = Regex("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9-.]+(\\s)*")

data class User(val userId: String)

class UserRegistration {
  private fun String.isValidEmail() = EMAIL_REGEX.matches(this)

  fun isValidUser(user: User) = user.userId.isValidEmail()
}

fun main() {
  val registrar = UserRegistration()

  println(registrar.isValidUser(User(userId = "martians-so-do-not-exist@commonsware.com")))
  println(registrar.isValidUser(User(userId = "this is not an email address")))
}
/* 
true
false

在入口文件定义的私有方法，可以跨越在该文件的其他方法和类中进行使用
 */