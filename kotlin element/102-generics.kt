open class Animal

class Frog : Animal()

class Axolotl : Animal()

data class Transport<T>(var passenger: T)

fun main() {
  val kermit = Frog()
  val critterCarrier = Transport(kermit)

  println(critterCarrier.passenger::class)
}

/* 
class Frog

泛型比较简单的写法，调用的时候，直接根据参数来进行类型识别了
 */