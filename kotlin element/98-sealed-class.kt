sealed class BrowserLocation(open val url: String) {
  object HomePage : BrowserLocation("https://commonsware.com")

  data class Bookmark(override val url: String, val name: String) : BrowserLocation(url)

  data class HistoryEntry(override val url: String, val title: String, val lastVisited: String) : BrowserLocation(url)
}

fun main() {
  println(BrowserLocation.HomePage.url)

  val bookmark = BrowserLocation.Bookmark("https://kotlinlang.org", "Kotlin!")

  println(bookmark)
}

/* 
https://commonsware.com
Bookmark(url=https://kotlinlang.org, name=Kotlin!)

sealed class 定义的类，只能在同一个文件中被继承
 */