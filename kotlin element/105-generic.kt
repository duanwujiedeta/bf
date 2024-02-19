open class Thingy

open class Animal : Thingy()

class Frog : Animal()

class Axolotl : Animal()

interface Transport<T : Thingy> {
  abstract fun getPassenger(): T
}

data class Van(val animal: Animal) : Transport<Animal> {
  override fun getPassenger() = animal
}

fun main() {
  val kermit = Frog()
  val critterCarrier = Van(kermit)

  println(critterCarrier.getPassenger()::class)
}

/* 
class Frog

感觉跟 104 没啥区别
 */