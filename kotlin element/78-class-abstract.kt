abstract class Animal {
  abstract fun hasGills(): Boolean

  fun description() = "hasGills = ${hasGills()}"
}

class Frog(val hasGillsRightNow: Boolean) : Animal() {
  override fun hasGills() = hasGillsRightNow
}

class Axolotl : Animal() {
  override fun hasGills() = true
}

class KomodoDragon : Animal() {
  override fun hasGills() = false
}

fun main() {
  println(Axolotl().description())
  println(KomodoDragon().description())
  println(Frog(true).description())
}
/* 
hasGills = true
hasGills = false
hasGills = true


对于类，含有 abstract 修饰符，该修饰符号，用来修饰 类 和 方法；
对于子类继承 abstract 类，要不就实现了它的 abstract 方法，要不就继承作为 abstract 类
 */