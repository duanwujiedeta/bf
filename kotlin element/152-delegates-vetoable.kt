import kotlin.properties.Delegates

fun main() {
  var noOddValuesPlease: Int by Delegates.vetoable(2) { property, oldValue, newValue ->
    newValue % 2 == 0
  }

  println(noOddValuesPlease)

  noOddValuesPlease = 4
  println(noOddValuesPlease)

  noOddValuesPlease = 3
  println(noOddValuesPlease)
}

/* 
2
4
4

也可以使用 Delegates.vetoable 来进行变量的返回
 */