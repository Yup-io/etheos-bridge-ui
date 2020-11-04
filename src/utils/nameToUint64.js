import { charToSymbol } from './charToSymbol'
import BigInt from 'big-integer'

/**
 * convert string to create ID in EOS smart contract
 * @param {String} s
 * @return string to uint64 is not fit to js number, the return value is string format
 */

 // testingtesti
 // 0x63f878a7d75B09633008350eA6290A63e61b5eEe
export default function nameToUint64 (s) {
  let n = BigInt(0)

  let i = 0
  for (; i < 12 && s[i]; i++) {
    console.log(s[i])
    console.log(s.charCodeAt(i))
    console.log(charToSymbol(s.charCodeAt(i)) & 0x1f)
    console.log(BigInt(charToSymbol(s.charCodeAt(i)) & 0x1f))
    console.log(BigInt(64 - 5 * (i + 1)))
    console.log(BigInt(charToSymbol(s.charCodeAt(i)) & 0x1f) << BigInt(64 - 5 * (i + 1)))
    n |= BigInt(charToSymbol(s.charCodeAt(i)) & 0x1f) << BigInt(64 - 5 * (i + 1))
    console.log(n)
  }

  if (i === 12) {
    n |= BigInt(charToSymbol(s.charCodeAt(i)) & 0x0f)
  }

  return n.toString()
}
