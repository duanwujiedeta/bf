fun itsGonnaBlow() {
  var thisIsReallyNull: String? = null

  println(thisIsReallyNull)
  println(thisIsReallyNull!!.length)
}

fun lengthifier(nullAllowedButNotReally: String?): Int {
  return nullAllowedButNotReally!!.length
}

fun lengthifier(nullAllowedButNotReally: String?): Int {
  if (nullAllowedButNotReally == null) throw Exception("Please do not pass null to me!")

  return nullAllowedButNotReally!!.length
}

fun main() {
  try {
    var thisIsReallyNull: String? = null

    println(thisIsReallyNull)
    println(thisIsReallyNull!!.length)
  }
  catch (e: Exception) {
    println("ERROR: '$e'")
  }
/* 
null
ERROR: 'NullPointerException'
 */


  try {
    var thisIsReallyNull: String? = null

    println(thisIsReallyNull)
    println(thisIsReallyNull!!.length)
  }
  catch (npe: NullPointerException) {
    println("You tried doing something unfortunate with null. Stop that.")
  }
  catch (e: Exception) {
    println("ERROR: '$e'")
  }
/* 
null
You tried doing something unfortunate with null. Stop that.

此种类型是多层进行捕获
*/

  try {
    itsGonnaBlow()
  }
  catch (npe: NullPointerException) {
    println("You tried doing something unfortunate with null. Stop that.")
  }
  catch (e: Exception) {
    println("ERROR: '$e'")
  }

  /* 
  此种异常捕获是会往上提升，直到找到 try/catch 来处理异常
   */


  val result = try {
    lengthifier(null)
  }
  catch (e: Exception) {
    -1
  }

  println(result) // 1
  /* 
  try/catch 和一个有返回值的函数式相同，try块做处理，catch 块做返回
  */

  println(lengthifier(null)) // 这里会抛出异常，当然，抛出的异常如果更顶部有 try/catch 的话，则会被更顶部的 try/catch 捕获到

}
