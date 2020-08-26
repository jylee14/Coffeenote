/* eslint no-extend-native: 0 */
String.prototype.capitalize = function () {
  const firstChar = this.charAt(0)
  if (/\w+/.test(firstChar)) {
    return firstChar.toUpperCase() + this.slice(1)
  }
  return this
}

String.prototype.capitalizeEach = function() {
  return this.split(' ').map(word => word.capitalize()).join(' ')
}

String.prototype.ignoreCaseIncludes = function(substring) {
  return this.toLowerCase().includes(substring.toLowerCase())
}

String.prototype.toCamelCase = function() {
  const components = this.split(' ')
  const upperCased = components.map((component, i) => i === 0 ? component.toLowerCase() : component.capitalize())
  return upperCased.join('')
}