sealed class BrowserLocation(open val url: String) {
  object HomePage : BrowserLocation("https://commonsware.com")

  data class Bookmark(override val url: String, val name: String) : BrowserLocation(url)

  data class HistoryEntry(override val url: String, val title: String, val lastVisited: String) : BrowserLocation(url)
}

fun main() {
  val location: BrowserLocation = BrowserLocation.Bookmark("https://kotlinlang.org", "Kotlin!")

  val title = when (location) {
    BrowserLocation.HomePage -> "Home"
    is BrowserLocation.Bookmark -> location.name
    is BrowserLocation.HistoryEntry -> location.title
  }

  println(title)
}

/* 
Kotlin!

 */