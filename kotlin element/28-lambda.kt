fun main() {
  val lambda = { println("Hello, world!") }

  lambda.invoke()
}

/* 
Hello, world!
 */

/* 
lambda表达式使用 {} 来定义，调用的时候，直接用 invoke() 方法
 */