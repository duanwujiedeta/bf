fun main() {
  val value = "something"

  println(value.toUpperCase().toLowerCase() == value)   // prints true
  println(value.toUpperCase().toLowerCase() === value)  // prints false in Kotlin/JVM and true in Kotlin/JS
}
/* 
    == 是比较 对象的内容，=== 还会比较对象的引用
    输出：
    true
    true
 */