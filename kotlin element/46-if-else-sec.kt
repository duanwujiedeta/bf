fun main() {
  val bar = 5
  val foo = if (bar > 10) {
    10
  }
  else {
    bar
  }

  println(foo)
}

/* 
5
 */