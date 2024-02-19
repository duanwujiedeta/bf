class Transmogrifier {
  fun transmogrify() {
    println("Presto, change-o!")
  }
}

val QUASI_SINGLETON = Transmogrifier() // 相当于 javascript 的全局变量

fun main() {
  QUASI_SINGLETON.transmogrify()
}

/* 
Presto, change-o!
 */