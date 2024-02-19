import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    flowOf("A", "B", "C")
      .onEach { delay(100) }
      .combine(flowOf("a", "b", "c", "d", "e").onEach { delay(133) }) { i, s -> i to s }
      .collect { println(it) }
  }
}

/* 
(A, a)
(B, a)
(B, b)
(C, b)
(C, c)
(C, d)
(C, e)

In this case, we have a flow of capital letters, each with a 100 millisecond delay after each emission. We also have a flow of lowercase letters, each with a 133 millisecond delay after each emission. We combine() those two flows, mapping the two letters into a Pair using the to operator.

The capital-letter flow will complete before the lowercase-letter flow will, as we have more lowercase letters and a longer delay. Yet, combine() will emit the combinations until both flows are completed. At the time either upstream flow emits a value, combine() takes the latest value from each flow, combines them (in this case into a Pair), and emits the result.


在这种情况下，我们有一个大写字母流，每个字母在每次发射后都有 100 毫秒的延迟。 我们还有一个小写字母流，每个字母在每次发射后都有 133 毫秒的延迟。 我们 combine() 这两个流，使用 to 运算符将两个字母映射到一个 Pair 中。

大写字母流将在小写字母流之前完成，因为我们有更多的小写字母和更长的延迟。 然而， combine() 将发出组合，直到两个流程都完成。 在任一上游流发出值时，combine() 从每个流中获取最新值，将它们组合（在本例中为 Pair），并发出结果。

https://klassbook.commonsware.com/lessons/Flows%20and%20Channels/distinctUntilChanged.html
 */