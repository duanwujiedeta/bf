class Thingy {
  object Somethingifier {
    fun doSomething() {
      println("Ummm... is this something?")
    }
  }

  // TODO add other properties and functions
}

fun main() {
  Thingy.Somethingifier.doSomething()
}

/* 
Ummm... is this something?

上面的 class 没有 companion ，但是使用 object 也可以使用静态方法来调用
 */