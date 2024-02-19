open class Animal

class Frog : Animal()

class Axolotl : Animal()

fun main() {
  val kermit : Animal = Frog()

  val notAnAxolotl = kermit as? Axolotl // as? 当父类转换到子类转换不了的时候，则会变成 null

  println(notAnAxolotl)
}

/* 
​
null
 */