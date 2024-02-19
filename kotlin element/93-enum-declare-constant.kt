enum class HttpResponse(val code: Int, val message: String) {
  OK(200, "OK"),
  MOVED_PERMANENTLY(301, "Moved Permanently"),
  NOT_MODIFIED(304, "Not Modified"),
  UNAUTHORIZED(401, "Unauthorized"),
  NOT_FOUND(404, "Not Found"),
  INTERNAL_SERVER_ERROR(501, "WTF?");

  override fun toString() = message
}

fun main() {
  println(HttpResponse.INTERNAL_SERVER_ERROR.toString())
}

/* 
WTF?

每个枚举之间用 , 隔开，末尾带有 ; ，然后再定义或者重写函数方法
 */