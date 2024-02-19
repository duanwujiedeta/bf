import kotlin.random.Random

fun percentileDice() = Random.nextInt(1,100)

fun main() {
  val sequence = generateSequence {
    percentileDice().takeIf { it < 95 }// 如果生成的值大于等于 95 ，则停止生成
  }

  println(sequence.toList())
}
/* 
[61, 37, 10, 90, 41, 69, 67, 8, 1]

随机出现一个数组，该数组或长或短
 */