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
    is Axolotl -> critter.swim()
  }
}
/* 
​
Hop!
 */
