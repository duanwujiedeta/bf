class GoAway(message: String) : Exception(message)

fun lengthifier(nullAllowedButNotReally: String?): Int {
  if (nullAllowedButNotReally == null) throw GoAway("Please do not pass null to me!")

  return nullAllowedButNotReally!!.length
}

fun main() {
  val result = try {
    lengthifier(null)
  }
  catch (away: GoAway) {
    -2
  }
  catch (e: Exception) {
    -1
  }

  println(result)
}

/* 
-2

可以继承 Exception 类来进行异常 类 扩展，然后在捕获的时候捕获自己自定义的类型
 */