fun main() {
  val thingsList = mutableListOf("foo", "bar", "goo")

  thingsList[1] = "something completely different"

  println(thingsList[1])
}

/* 
something completely different

mutableListOf 的元素是可以更改的
 */