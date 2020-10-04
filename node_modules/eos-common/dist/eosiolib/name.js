"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("./check");
const big_integer_1 = __importDefault(require("big-integer"));
/**
 * @class Stores the name
 * @brief Stores the name as a uint64_t value
 */
class Name {
    constructor(str) {
        this.value = big_integer_1.default(0);
        let value = big_integer_1.default(0);
        if (typeof str == "number" || typeof str == "bigint") {
            this.value = big_integer_1.default(str);
            return;
        }
        if (typeof str == "string") {
            if (str.length > 13)
                check_1.check(false, "string is too long to be a valid name");
            else if (str == undefined || str == null || str.length == 0)
                return;
            const n = Math.min(str.length, 12);
            for (let i = 0; i < n; ++i) {
                value = value.shiftLeft(5);
                value = value.or(Name.char_to_value(str[i]));
            }
            value = value.shiftLeft(4 + 5 * (12 - n));
            if (str.length == 13) {
                const v = Name.char_to_value(str[12]);
                if (v > 0x0F) {
                    check_1.check(false, "thirteenth character in name cannot be a letter that comes after j");
                }
                value = value.or(v);
            }
            this.value = value;
        }
        else if (typeof str == "object") {
            this.value = str;
        }
    }
    get [Symbol.toStringTag]() {
        return 'name';
    }
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof() { return 'name'; }
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj) { return obj instanceof Name; }
    /**
     *  Converts a %name Base32 symbol into its corresponding value
     *
     *  @param c - Character to be converted
     *  @return constexpr char - Converted value
     */
    static char_to_value(c) {
        if (c == '.')
            return 0;
        else if (c >= '1' && c <= '5')
            return c.charCodeAt(0) - '1'.charCodeAt(0) + 1;
        else if (c >= 'a' && c <= 'z')
            return c.charCodeAt(0) - 'a'.charCodeAt(0) + 6;
        else
            check_1.check(false, "character is not in allowed character set for names");
        return 0; // control flow will never reach here; just added to suppress warning
    }
    /**
     *  Returns the length of the %name
     */
    length() {
        const mask = big_integer_1.default(0xF800000000000000);
        if (this.value.equals(0))
            return 0;
        let l = 0;
        let i = 0;
        for (let v = this.value; i < 13; ++i, v = v.shiftLeft(5)) {
            if (v.and(mask).greater(0)) {
                l = i;
            }
        }
        return l + 1;
    }
    /**
     *  Returns the suffix of the %name
     */
    suffix() {
        let remaining_bits_after_last_actual_dot = big_integer_1.default(0);
        let tmp = big_integer_1.default(0);
        for (let remaining_bits = big_integer_1.default(59); remaining_bits.greaterOrEquals(4); remaining_bits = remaining_bits.minus(5)) { // Note: remaining_bits must remain signed integer
            // Get characters one-by-one in name in order from left to right (not including the 13th character)
            const c = (this.value.shiftRight(remaining_bits)).and(0x1F);
            if (c.equals(0)) { // if this character is a dot
                tmp = remaining_bits;
            }
            else { // if this character is not a dot
                remaining_bits_after_last_actual_dot = tmp;
            }
        }
        const thirteenth_character = this.value.and(0x0F);
        if (thirteenth_character.notEquals(0)) { // if 13th character is not a dot
            remaining_bits_after_last_actual_dot = tmp;
        }
        if (remaining_bits_after_last_actual_dot.equals(0)) // there is no actual dot in the %name other than potentially leading dots
            return new Name(this.value);
        // At this point remaining_bits_after_last_actual_dot has to be within the range of 4 to 59 (and restricted to increments of 5).
        // Mask for remaining bits corresponding to characters after last actual dot, except for 4 least significant bits (corresponds to 13th character).
        const mask = (big_integer_1.default(1).shiftLeft(remaining_bits_after_last_actual_dot)).minus(16);
        const shift = big_integer_1.default(64).minus(remaining_bits_after_last_actual_dot);
        return new Name(((this.value.and(mask)).shiftLeft(shift)).plus(thirteenth_character.shiftLeft((shift.minus(1)))));
    }
    /**
     * Returns uint64_t repreresentation of the name
     */
    raw() {
        return this.value;
    }
    /**
     * Explicit cast to bool of the name
     *
     * @return Returns true if the name is set to the default value of 0 else true.
     */
    bool() {
        return this.value.notEquals(0);
    }
    /**
     * The toString() method returns the string representation of the object.
     */
    toString() {
        return this.to_string();
    }
    to_string() {
        const charmap = ".12345abcdefghijklmnopqrstuvwxyz";
        const mask = big_integer_1.default(0xF800000000000000);
        let begin = "";
        let v = this.value;
        const actual_end = this.length();
        for (let i = 0; i < 13; ++i, v = v.shiftLeft(5)) {
            if (v.equals(0))
                return begin;
            if (i >= actual_end)
                return begin;
            const indx = (v.and(mask)).shiftRight(i == 12 ? 60 : 59);
            begin += charmap[Number(indx)];
        }
        return begin;
    }
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided name are the same
     */
    static isEqual(a, b) {
        return a.raw().equals(b.raw());
    }
    isEqual(a) {
        return a.raw().equals(this.raw());
    }
    /**
     * Inverted equivalency operator. Returns true if a != b (are different)
     *
     * @return boolean - true if both provided name are not the same
     */
    static isNotEqual(a, b) {
        return a.raw().notEquals(b.raw());
    }
    isNotEqual(a) {
        return a.raw().notEquals(this.raw());
    }
    /**
     * Less than operator. Returns true if a < b.
     * @brief Less than operator
     * @return boolean - true if name `a` is less than `b`
     */
    static isLessThan(a, b) {
        return a.raw().lesser(b.raw());
    }
    isLessThan(a) {
        return this.raw().lesser(a.raw());
    }
}
exports.Name = Name;
function name(str) {
    return new Name(str);
}
exports.name = name;
