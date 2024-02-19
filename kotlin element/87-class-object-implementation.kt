interface Somethingifier {
  abstract fun doSomething()
}

class Thingy {
  val somethingifier = object : Somethingifier {
    override fun doSomething() {
      println("Ummm... is this something?")
    }
  }

  // TODO add other properties and functions
}

fun main() {
  val thingy = Thingy()

  thingy.somethingifier.doSomething()
}

/* 
Ummm... is this something?

上面中，使用 object : Somethingifier 来继承了 Somethingifier 接口并创建为一个 实例，它也可以用来继承 abstract 类

上面例子中， somethingifier 变量是一个内部类
 */