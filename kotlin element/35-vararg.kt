fun main() {
  reciprocate(1, 2, 3, 5, 7)
}

fun reciprocate(vararg values: Int) {
  values
    .map { 1.0 / it }
    .forEach { println(it) }
}

/**
1
0.5
0.3333333333333333
0.2
0.14285714285714285
 */
/*
vararg 定义后的参数会转为一个 collection ，该collection 能够进行 collection 的相关操作
 */ 