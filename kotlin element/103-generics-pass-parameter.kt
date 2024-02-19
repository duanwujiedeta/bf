open class Animal

class Frog : Animal()

class Axolotl : Animal()

data class Transport<T>(var passenger: T)

fun main() {
  val kermit: Animal = Frog()
  val critterCarrier = Transport(kermit)

  println(critterCarrier.passenger::class)

  critterCarrier.passenger = Axolotl()

  println(critterCarrier.passenger::class)
}

/* 
class Frog
class Axolotl

泛型传参，注意 继承 类，此处需要谨慎，一般子类型也是父类型的一种类型。
 */