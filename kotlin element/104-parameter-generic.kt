open class Animal

class Frog : Animal()

class Axolotl : Animal()

interface Transport<T> {
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

泛型的参数，定义了父类的类型，在使用的时候，传递子类类型可以通过
 */