data class Animal(val species: String, val ageInYears: Float)

fun main() {
  val critter = Animal("frog", 3.14F)
  val youngerCritter = critter.copy(ageInYears = 0.1F)

  println(youngerCritter)
}

/*
Animal(species=frog, ageInYears=0.1)

data class 关键字定义的类，专门用来存储数据的
看上 例子
 */