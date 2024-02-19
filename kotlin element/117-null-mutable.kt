fun main() {
  val nullableList : MutableList<String>? = mutableListOf()

  nullableList?.add("this is not null")
  nullableList?.add("this is also not null")

  println(nullableList)
}

/* 
[this is not null, this is also not null]

val nullableList : MutableList<String>? = // 表示 nullableList 初始化的时候，可以为努力了
 */