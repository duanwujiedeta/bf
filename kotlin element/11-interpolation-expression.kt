fun main() {
    val count = 3

    println("The value of count is not ${count+2}")

    var postIncrement = 5

    println("postIncrement ${postIncrement} ${postIncrement++} ${postIncrement}")

    var preIncrement = 5

    println("preIncrement ${preIncrement} ${++preIncrement} ${preIncrement}")

    var postDecrement = 5

    println("postDecrement ${postDecrement} ${postDecrement--} ${postDecrement}")

    var preDecrement = 5

    println("preDecrement ${preDecrement} ${--preDecrement} ${preDecrement}")
}
/* 
    输出：
    The value of count is not 5
    postIncrement 5 5 6
    preIncrement 5 6 6
    postDecrement 5 5 4
    preDecrement 5 4 4
    
    插值表达式  ${}
 */
