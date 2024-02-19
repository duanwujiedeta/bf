fun main() {
  val listOfNullables : MutableList<String?> = mutableListOf()

  listOfNullables.add("this is not null")
  listOfNullables.add(null)

  println(listOfNullables)
}

/* 
[this is not null, null]

MutableList 的元素允许存在 null
 */