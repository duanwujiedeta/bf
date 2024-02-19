interface Aquatic {
  fun hasGills(): Boolean
}

interface ReproductionMode {
  fun isOviparous(): Boolean     // i.e., does it lay eggs?
}

open class Animal

abstract class AquaticAnimal : Animal(), Aquatic, ReproductionMode {
  fun description() = "hasGills = ${hasGills()}, isOviparous() = ${isOviparous()}"
}

class Frog(val hasGillsRightNow: Boolean) : AquaticAnimal() {
  override fun hasGills() = hasGillsRightNow
  override fun isOviparous() = true
}

class Axolotl : AquaticAnimal() {
  override fun hasGills() = true
  override fun isOviparous() = true
}

class Orca : AquaticAnimal() {
  override fun hasGills() = false
  override fun isOviparous() = false
}

class KomodoDragon : Animal(), ReproductionMode {
  override fun isOviparous() = true
}

fun main() {
  println(Axolotl().description())
  println(Frog(true).description())
  println(Orca().description())
}

/* 
hasGills = true, isOviparous() = true
hasGills = true, isOviparous() = true
hasGills = false, isOviparous() = false


对于继承多个类和接口，直接使用 逗号（,） 进行分开调用
 */