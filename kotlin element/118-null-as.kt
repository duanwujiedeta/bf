fun main() {
  val nullableList : MutableList<String>? = mutableListOf()

  nullableList?.add("this is not null")
  nullableList?.add("this is also not null")

  val simplerList = nullableList as? List<String>

  println(simplerList)
}
/* 
[this is not null, this is also not null]

as 转换类型的时候，普通情况下，如果类型值为 null 的时候，会报错的 ，用 as? 可以兼容为 null 的情况，null 的时候为 null
 */