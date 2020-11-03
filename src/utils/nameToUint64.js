import { charToSymbol } from './charToSymbol'
import { BigInt } from 'big-integer'

/**
 * convert string to create ID in EOS smart contract
 * @param {String} s
 * @return string to uint64 is not fit to js number, the return value is string format
 */
export default function nameToUint64 (s) {
  let n = BigInt(0)

  let i = 0
  for (; i < 12 && s[i]; i++) {
    n |= BigInt(charToSymbol(s.charCodeAt(i)) & 0x1f) << BigInt(64 - 5 * (i + 1))
  }

  if (i === 12) {
    n |= BigInt(charToSymbol(s.charCodeAt(i)) & 0x0f)
  }

  return n.toString()
}
