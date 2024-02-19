console.log("formatProdErrorMessage");
console.log(formatProdErrorMessage(8864, "abc", "def")); // Minified React error #8864; visit https://reactjs.org/docs/error-decoder.html?invariant=8864&args[]=abc&args[]=def for the full message or use the non-minified dev environment for full errors and additional helpful warnings.


// registerDirectEvent 执行完毕之后
// registrationNameDependencies  见 registrationNameDependencies.json
// allNativeEvents  见allNativeEvents.json

console.log("\n");
console.log("isAttributeNameSafe");
console.log(isAttributeNameSafe("abc"));// true
console.log(isAttributeNameSafe("121"));// false
console.log(isAttributeNameSafe(121));// false
console.log(isAttributeNameSafe("$%^"));// false


console.log("\n");
console.log("shouldIgnoreAttribute");
var childInfo = properties["children"];
var acceptCharset = properties["acceptCharset"];
console.log(shouldIgnoreAttribute(null, childInfo)); // true ，第二个参数的 type 值为 0
console.log(shouldIgnoreAttribute(null, acceptCharset));// false， ，第二个参数的 type 值不为 0
console.log(shouldIgnoreAttribute("onClick", null));// true， 以 oN On ON on 开头


console.log("\n");
console.log("shouldRemoveAttributeWithWarning");
console.log(shouldRemoveAttributeWithWarning("abc", "def", childInfo)); // false
console.log(shouldRemoveAttributeWithWarning("abc", true, acceptCharset));// true
console.log(shouldRemoveAttributeWithWarning("abc", Symbol.for("123"), null));// true
console.log(shouldRemoveAttributeWithWarning("abc", true, null));// true
console.log(shouldRemoveAttributeWithWarning("data-abc", true, null));// false
// Has Done


console.log("\n");
