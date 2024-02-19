open class Animal

class Frog : Animal() {
  fun hop() = println("Hop!")
}

class Axolotl : Animal() {
  fun swim() = println("Swish!")
}

fun main() {
  val critter: Animal = Frog()

  when (critter) {
    is Frog -> critter.hop()
    else -> (critter as Axolotl).swim() // 该处使用了 as 来进行类型的转换，编译器不一定能够自动识别它的类型
  }
}

/* 
Hop!


 */