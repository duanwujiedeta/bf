interface Aquatic {
  fun hasGills(): Boolean
}

open class Animal

abstract class AquaticAnimal : Animal(), Aquatic {
  fun description() = "hasGills = ${hasGills()}"
}

class Frog(val hasGillsRightNow: Boolean) : AquaticAnimal() {
  override fun hasGills() = hasGillsRightNow
}

class Axolotl : AquaticAnimal() {
  override fun hasGills() = true
}

fun main() {
  println(Axolotl().description())
  println(Frog(true).description())
}

/* 
hasGills = true
hasGills = true

对于 interface ，它类似于 abstract 的类；
继承 interface 的时候，不用使用  () 来调用，如下：
abstract class AquaticAnimal : Aquatic{}
 */