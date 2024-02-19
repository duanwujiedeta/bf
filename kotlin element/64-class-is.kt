open class Animal

class Frog : Animal()

class Axolotl : Animal()

fun main() {
  val critter: Animal = Frog()

  if (critter is Frog) println("Ribbit!") else println("Ummm... whatever noise an axolotl makes!")
}

/* 
Ribbit!

使用 is 来判断对象的构造类型
 */