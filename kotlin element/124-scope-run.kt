data class IntPropertyBag(private val pieces: MutableMap<String, Int> = mutableMapOf()) {
  fun set(key: String, value: Int) {
    pieces[key] = value
  }
}

fun main() {
  val ultimateStuff = IntPropertyBag().run {
    set("ID", 330258648)
    set("YEAR", 1979)
    set("HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN", 42)

    toString()
  }

  println(ultimateStuff)
}

/* 
IntPropertyBag(pieces={ID=330258648, YEAR=1979, HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN=42})

run 的方法是把对象的方法另外调用做输出，apply 只会返回对应实例，let 会返回 lambda 表达式的返回值
 */