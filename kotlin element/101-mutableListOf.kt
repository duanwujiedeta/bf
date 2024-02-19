open class Animal

class Frog : Animal()

class Axolotl : Animal()

fun main() {
  val critters = mutableListOf(Frog(), Axolotl(), "ribbit!")

  critters.add("[insert axolotl sound here]")

  println(critters::class)
  println(critters.map { it::class.toString() }.joinToString())
}

/* 
class ArrayList
class Frog, class Axolotl, class String, class String

MutableList 是一个可以参杂不同类型的集合，相当于 泛型  的扩展
 */