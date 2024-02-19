data class IntPropertyBag(private val pieces: MutableMap<String, Int> = mutableMapOf()) {
  fun set(key: String, value: Int) {
    pieces[key] = value
  }
}

fun main() {
  val sometime = IntPropertyBag()

  sometime.apply {
    set("ID", 330258648)
    set("YEAR", 1979)
    set("HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN", 42)
  }

  println(sometime)
}
/* 
IntPropertyBag(pieces={ID=330258648, YEAR=1979, HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN=42})

apply 方法提供一个 lambda 函数作为参数进行调用，里面可以直接使用 实例 的方法来调用，有点像 javascript 的 with 。
 */