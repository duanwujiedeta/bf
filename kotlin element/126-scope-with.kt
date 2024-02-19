data class IntPropertyBag(private val pieces: MutableMap<String, Int> = mutableMapOf()) {
  fun set(key: String, value: Int) {
    pieces[key] = value
  }
}

fun main() {
  val ultimateStuff = with(IntPropertyBag()) {
    set("ID", 330258648)
    set("YEAR", 1979)
    set("HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN", 42)

    toString()
  }

  println(ultimateStuff)
}

/* 
IntPropertyBag(pieces={ID=330258648, YEAR=1979, HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN=42})

with 和 run 不同在于，run 由对象调用，with 则是添加对象作为参数
 */