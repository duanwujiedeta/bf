import kotlin.properties.Delegates

fun main() {
  var observed: String by Delegates.observable("initial value") { property, oldValue, newValue ->
    println("'${property.name}' changed from '$oldValue' to '$newValue'")
  }

  println(observed)

  observed = "new value"

  println(observed)
}

/* 
initial value
'observed' changed from 'initial value' to 'new value'
new value

可以使用 kotlin.properties.Delegates 来进行委托属性的输出
 */