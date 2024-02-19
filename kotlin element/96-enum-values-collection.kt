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
  for (constant in HttpResponse.values()) {
    println(constant)
  }
}

/* 
OK
Moved Permanently
Not Modified
Unauthorized
Not Found
WTF?


values 返回一个 collection 对象
 */