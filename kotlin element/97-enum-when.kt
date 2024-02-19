enum class HttpResponse(val code: Int) {
  OK(200),
  MOVED_PERMANENTLY(301),
  NOT_MODIFIED(304),
  UNAUTHORIZED(401),
  NOT_FOUND(404),
  INTERNAL_SERVER_ERROR(501);

  override fun toString() = when(this) {
    OK -> "OK"
    MOVED_PERMANENTLY -> "Moved Permanently"
    NOT_MODIFIED -> "Not Modified"
    UNAUTHORIZED -> "Unauthorized"
    NOT_FOUND -> "Not Found"
    INTERNAL_SERVER_ERROR -> "WTF?"
  }
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

上面使用 when 来进行生成 values() 集合对应的输出值
 */