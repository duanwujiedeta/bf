enum class HttpResponse(val code: Int, val message: String) {
  OK(200, "OK"),
  MOVED_PERMANENTLY(301/* code */, "Moved Permanently"),
  NOT_MODIFIED(304, "Not Modified"),
  UNAUTHORIZED(401, "Unauthorized"),
  NOT_FOUND(404, "Not Found"),
  /* name */INTERNAL_SERVER_ERROR(501, "WTF?");

  override fun toString() = message
}

fun main() {
  println(HttpResponse.INTERNAL_SERVER_ERROR.toString())
  println(HttpResponse.INTERNAL_SERVER_ERROR.code)
  println(HttpResponse.INTERNAL_SERVER_ERROR.name)
  println(HttpResponse.INTERNAL_SERVER_ERROR.ordinal/* 顺序，从 0 开始的 */)
}

/* 
WTF?
501
INTERNAL_SERVER_ERROR
5

enum 的一些属性，需要对照理解,看上面注释
 */