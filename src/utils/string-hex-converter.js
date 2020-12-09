// https://stackoverflow.com/questions/21647928/javascript-unicode-string-to-hex

export function nameToUint64 (s) {
  var hex, i

  var result = ''
  for (i = 0; i < 12 && s[i]; i++) {
      hex = s.charCodeAt(i).toString(16)
      result += hex
  }

  return result
}

export function uint64ToName (s) {
  var j
  var hexes = s.match(/.{1,4}/g) || []
  var back = ''
  for (j = 0; j < hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16))
  }

  return back
}
