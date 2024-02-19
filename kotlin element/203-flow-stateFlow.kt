import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun sourceOfStates(): Flow<String> {
  val states = MutableStateFlow<String>("Alabama")
  
  GlobalScope.launch(Dispatchers.Default) {
    listOf("Alaska", "Arizona", "Arkansas", "California",
           "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
           "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
           "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
           "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
           "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
           "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
           "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
           "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
           "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
          ).forEach { state ->
      states.value = state
      delay(200)
    }
  }
  
  return states
}

fun main() {
  GlobalScope.launch(Dispatchers.Main) {
    sourceOfStates().collect { println(it) }
    println("That's all folks!")
  }

  println("...and we're off!")
}

/* 
...and we're off!
Alabama
Alaska
Arizona
Arkansas
California
Colorado
Connecticut
Delaware
Florida
Georgia
Hawaii
Idaho
Illinois

StateFlow and MutableStateFlow are also relatively new additions to coroutines. A StateFlow is a bit like a Flow edition of a ConflatedBroadcastChannel:

It can be observed by multiple parties, like a SharedFlow

Objects placed into the flow are conflated

The holder of a StateFlow can not only use Flow-like constructs to observe the flow (e.g., collect()) but also can use a value property to get the most-recent object placed onto the StateFlow. Also, once an observer starts observing, it immediately receives the most-recent object, in addition to future ones while it is observing.

The typical way to set up a StateFlow is to use a MutableStateFlow. The constructor-style factory function takes the initial state as a parameter, and you can use the value property to change that state as needed.

Here, we emit the names of the 50 US states onto a MutableStateFlow. With the 200 millisecond delay, the consumer can keep up, and you should see all 50 in the output. But, if you edit this sample and comment out the delay() call, you will find that most of the states get conflated, so the output shows only a subset, often just the first and last.


StateFlow 和 MutableStateFlow 也是协程中相对较新的补充。 StateFlow 有点像 ConflatedBroadcastChannel 的 Flow 版本：

它可以被多方观察到，就像一个 SharedFlow

放入流中的对象被合并

StateFlow 的持有者不仅可以使用类似 Flow 的构造来观察流（例如，collect()），还可以使用值属性来获取放置在 StateFlow 上的最新对象。 此外，一旦观察者开始观察，它会立即收到最新的对象，以及它正在观察的未来对象。

设置 StateFlow 的典型方法是使用 MutableStateFlow。 构造函数样式的工厂函数将初始状态作为参数，您可以使用 value 属性根据需要更改该状态。

在这里，我们将美国 50 个州的名称发送到 MutableStateFlow 上。 有了 200 毫秒的延迟，消费者可以跟上，您应该在输出中看到全部 50。 但是，如果您编辑此示例并注释掉 delay() 调用，您会发现大多数状态都被混淆了，因此输出仅显示一个子集，通常只是第一个和最后一个。
 */