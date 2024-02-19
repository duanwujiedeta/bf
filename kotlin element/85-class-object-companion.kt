class Thingy {
  private val count = 1

  companion object {
    fun doSomething(thingy: Thingy) {
      println(thingy.count)
    }
  }

  // TODO add other properties and functions
}

fun main() {
  Thingy.doSomething(Thingy())
}

/* 
1

Thingy.doSomething(Thingy()) 表达式中，如果 不调用 Thingy() ,直接调用 Thingy.doSomething() 会编译报错

 */