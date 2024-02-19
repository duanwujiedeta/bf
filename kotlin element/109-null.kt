val notGonnaHappen : String? = null // 在类型后面添加 ? ，表示该变量可以为 String 或者为 null，如 Int? 等

fun gotNoTimeForNull(parameter: String?) {
  println(parameter)
}

fun main() {
  gotNoTimeForNull(notGonnaHappen)
}

/* 
null


 */