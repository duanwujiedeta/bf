fun main() {
  val things = listOf("foo", "bar", "goo")

  things.forEach( { println(it) } )
}
/* 
foo
bar
goo

lambada，仅有一个参数的时候，可以省略参数，直接在函数体中用 it 来标识
 */