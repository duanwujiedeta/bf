fun main() {
  var count: Long = 5 // 也可以如此定义  var count = 5 ，kotlin 会自动检测类型

  println(count::class) // class Long
}