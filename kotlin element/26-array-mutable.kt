fun main() {
  val thingsArray = arrayOf("foo", "bar", "goo")

  thingsArray[1] = "something completely different"

  println(thingsArray[1])
}

/**
something completely different

数组的对象是可以改变的，直接使用下标 [] 进行更改
 */