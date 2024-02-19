import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

data class State(
  val number: Int
)

fun sourceOfStates(): Flow<State> {
  val states = MutableStateFlow<State>(State(123))
  
  GlobalScope.launch(Dispatchers.Default) {
    repeat(25) {
      delay(200)
      states.value = State(456)
    }
  }
  
  return states
}

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    sourceOfStates().collect { println(it) }
  }

  println("...and we're off!")
}

/* 
...and we're off!
State(number=123)
State(number=456)

StateFlow works using content equality to control conflation. If you set value of a MutableStateFlow to a new object that is equal to the existing value, the "new" value is not emitted to consumers.

In this example, our state is a State wrapper around an Int. State is a data class, so we get an equals() implementation that compares those Int values.

Initially, we populate our MutableStateFlow with State(123). We then update value with State(456) 25 times. We create new State objects for each of those passes, rather than reuse a single State. Yet, our collector will only receive the State(456) and the first of the State(123) states, not the remaining 24. Each of the latter 24 State(123) objects equals() the original one, so the collector is not given any of those 24.

StateFlow 使用内容相等来控制合并。 如果将 MutableStateFlow 的值设置为等于现有值的新对象，则“新”值不会发送给消费者。

在这个例子中，我们的状态是一个 Int 的 State 包装器。 State 是一个数据类，所以我们得到一个比较这些 Int 值的 equals() 实现。

最初，我们用 State(123) 填充我们的 MutableStateFlow。 然后我们用 State(456) 更新值 25 次。 我们为每个通道创建新的状态对象，而不是重复使用单个状态。 然而，我们的收集器将仅接收 State(456) 和 State(123) 状态中的第一个，而不是其余 24 个。后 24 个 State(123) 对象中的每一个都等于（）原始对象，因此收集器不是 给定这 24 个中的任何一个。

 */