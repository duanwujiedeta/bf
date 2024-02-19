enum class HttpResponse(val code: Int) {
  OK(200),
  MOVED_PERMANENTLY(301),
  NOT_MODIFIED(304),
  UNAUTHORIZED(401),
  NOT_FOUND(404),
  INTERNAL_SERVER_ERROR(501)
}

fun main() {
  println(HttpResponse.OK.code)
}

/* 
200

创建枚举并使用
enum class 定义的类就是一个枚举
 */