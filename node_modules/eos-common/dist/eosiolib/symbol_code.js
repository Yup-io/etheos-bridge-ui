"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("./check");
const big_integer_1 = __importDefault(require("big-integer"));
const utils_1 = require("./utils");
/**
 * @class Stores the symbol code
 * @brief Stores the symbol code as a uint64_t value
 */
class SymbolCode {
    // constructor()
    constructor(obj) {
        this.value = big_integer_1.default(0);
        // SymbolCode
        if (utils_1.getType(obj) == "symbol_code") {
            const symcode = obj;
            this.value = symcode.raw();
            // Number
        }
        else if (typeof obj == "number" || typeof obj == 'bigint') {
            this.value = big_integer_1.default(obj);
            // String
        }
        else if (obj && typeof obj == "string") {
            let value = big_integer_1.default(0);
            if (obj.length > 7) {
                check_1.check(false, "string is too long to be a valid symbol_code");
            }
            for (const itr of obj.split("").reverse().join("")) {
                if (itr < 'A' || itr > 'Z') {
                    check_1.check(false, "only uppercase letters allowed in symbol_code string");
                }
                value = value.shiftLeft(big_integer_1.default(8));
                value = value.or(big_integer_1.default(itr.charCodeAt(0)));
            }
            this.value = value;
            // BigInteger
        }
        else if (big_integer_1.default.isInstance(obj)) {
            this.value = obj;
        }
    }
    get [Symbol.toStringTag]() {
        return 'symbol_code';
    }
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof() { return 'symbol_code'; }
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj) { return obj instanceof SymbolCode; }
    raw() {
        return this.value;
    }
    isTruthy() {
        return this.value.notEquals(0);
    }
    isFalsy() {
        return this.value.equals(0);
    }
    length() {
        let sym = this.value;
        let len = 0;
        while (Number(sym) & 0xFF && len <= 7) {
            len++;
            sym = sym.shiftRight(8);
        }
        return len;
    }
    /**
     * The toString() method returns the string representation of the object.
     */
    toString() {
        return this.to_string();
    }
    to_string() {
        const mask = big_integer_1.default("0x00000000000000FF");
        if (this.value.equals(0))
            return '';
        let begin = "";
        let v = big_integer_1.default(this.value);
        for (let i = 0; i < 7; ++i, v = v.shiftRight(8)) {
            if (v.equals(0))
                return begin;
            begin += String.fromCharCode(Number(v.and(mask)));
        }
        return begin;
    }
    is_valid() {
        let sym = big_integer_1.default(this.value);
        for (let i = 0; i < 7; i++) {
            const c = String.fromCharCode(Number(sym.and(0xFF)));
            if (!("A" <= c && c <= "Z"))
                return false;
            sym = sym.shiftRight(8);
            if (sym.and(0xFF).equals(0)) {
                do {
                    sym = sym.shiftRight(8);
                    if (sym.and(0xFF).notEquals(0))
                        return false;
                    i++;
                } while (i < 7);
            }
        }
        return true;
    }
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided symbol_codes are the same
     */
    isEqual(comparison) {
        return comparison.value.equals(this.value);
    }
    /**
     * Inverted equivalency operator. Returns true if a != b (are different)
     *
     * @return boolean - true if both provided symbol_codes are not the same
     */
    isNotEqual(comparison) {
        return comparison.value.notEquals(this.value);
    }
    /**
     * Less than operator. Returns true if a < b.
     * @brief Less than operator
     * @return boolean - true if symbol_code `a` is less than `b`
     */
    isLessThan(comparison) {
        return this.value.lesser(comparison.value);
    }
}
exports.SymbolCode = SymbolCode;
function symbol_code(obj) {
    return new SymbolCode(obj);
}
exports.symbol_code = symbol_code;
