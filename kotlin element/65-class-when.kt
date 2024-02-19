open class Animal

class Frog : Animal()

class Axolotl : Animal()

fun main() {
  val critter: Animal = Frog()

  when (critter) {
    is Frog -> println("Ribbit!")
    else -> println("Ummm... whatever noise an axolotl makes!")
  }
}
/* 
Ribbit!

is 的判断可以放在 when 的表达式中
 */