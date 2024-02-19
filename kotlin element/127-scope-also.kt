data class IntPropertyBag(private val pieces: MutableMap<String, Int> = mutableMapOf()) {
  fun set(key: String, value: Int) {
    pieces[key] = value
  }
}


fun main() {
  val ultimateStuff = IntPropertyBag().also {
    it.set("ID", 330258648)
    it.set("YEAR", 1979)
    it.set("HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN", 42)
  }

  println(ultimateStuff)
}

/* 
IntPropertyBag(pieces={ID=330258648, YEAR=1979, HOW_MANY_ROADS_MUST_A_MAN_WALK_DOWN=42})


also ，兼容了 it 和 apply 
 */