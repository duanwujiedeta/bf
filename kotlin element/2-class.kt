fun main() {
  println(1234::class)
  println(1234L::class)
  println(3.14159::class)
  println(3.14159f::class)
  /* 
  输出值：用来直接获取类型的 class 对象
    class kotlin.Int
    class kotlin.Long
    class kotlin.Double
    class kotlin.Float
   */
}