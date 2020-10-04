"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("./check");
const symbol_code_1 = require("./symbol_code");
const big_integer_1 = __importDefault(require("big-integer"));
const utils_1 = require("./utils");
class Sym {
    /**
     * Symbol
     *
     * @name Symbol
     * @param {string} code Symbol Code
     * @param {number} precision Precision
     * @returns {Symbol} Symbol
     * @example
     *
     * const sym = new Symbol("EOS", 4);
     * sym.code() //=> "EOS"
     * sym.precision //=> 4
     */
    constructor(sc, precision) {
        this.value = big_integer_1.default(0);
        if (utils_1.isNull(sc) && utils_1.isNull(precision)) {
            this.value = big_integer_1.default(0);
            return;
        }
        // Number
        else if (typeof sc == "number" || typeof sc == "bigint") {
            this.value = big_integer_1.default(sc);
        }
        // BigInt
        else if (big_integer_1.default.isInstance(sc)) {
            this.value = sc;
        }
        else if (typeof sc == "string") {
            // "precision,symbol_code" (ex: "4,EOS")
            if (sc.includes(",")) {
                const [precision_str, symcode_str] = sc.split(",");
                const precision = Number(precision_str);
                check_1.check(!isNaN(precision), "[precision] must be number type");
                check_1.check(!utils_1.isNull(precision), "[precision] is required");
                check_1.check(!utils_1.isNull(symcode_str), "[symcode] is required");
                const symcode = new symbol_code_1.SymbolCode(symcode_str).raw();
                this.value = big_integer_1.default(symcode).shiftLeft(8).or(Number(precision_str || ""));
                // "symbol_code" + @param: precision
            }
            else {
                check_1.check(!isNaN(Number(precision)), "[precision] must be number type");
                check_1.check(!utils_1.isNull(precision), "[precision] is required");
                check_1.check(!utils_1.isNull(sc), "[symcode] is required");
                const symcode = new symbol_code_1.SymbolCode(sc).raw();
                this.value = big_integer_1.default(symcode).shiftLeft(8).or(precision || 0);
            }
        }
        else if (utils_1.getType(sc) == "symbol") {
            const sym = sc;
            this.value = sym.raw();
        }
        else if (utils_1.getType(sc) == "symbol_code") {
            const symcode = sc;
            check_1.check(!utils_1.isNull(precision), "[precision] is required");
            this.value = big_integer_1.default(symcode.raw()).shiftLeft(8).or(precision || 0);
        }
        else {
            check_1.check(false, "invalid symbol parameters");
        }
    }
    get [Symbol.toStringTag]() {
        return 'symbol';
    }
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof() { return 'symbol'; }
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj) { return obj instanceof Sym; }
    /**
     * Is this symbol valid
     */
    is_valid() {
        return this.code().is_valid();
    }
    /**
     * This symbol's precision
     */
    precision() {
        return Number(this.value.and("0x00000000000000FF"));
    }
    /**
     * Returns representation of symbol name
     */
    code() {
        return new symbol_code_1.SymbolCode(this.value.shiftRight(8));
    }
    /**
     * Returns uint64_t repreresentation of the symbol
     */
    raw() {
        return this.value;
    }
    /**
     * Explicit cast to bool of the symbol
     *
     * @return Returns true if the symbol is set to the default value of 0 else true.
     */
    bool() {
        return this.value.notEquals(0);
    }
    // /**
    //  * %Print the symbol
    //  */
    // public print( show_precision = true ): void {
    //     if ( show_precision ) {
    //         process.stdout.write( String( this.precision() ) + "," );
    //     }
    //     process.stdout.write( this.code().to_string() );
    // }
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(show_precision = true) {
        return `${show_precision ? String(this.precision()) + "," : ''}${this.code().to_string()}`;
    }
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided symbol_codes are the same
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
     * @return boolean - true if both provided symbol_codes are not the same
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
     * @return boolean - true if symbol_code `a` is less than `b`
     */
    static isLessThan(a, b) {
        return a.raw().lesser(b.raw());
    }
    isLessThan(a) {
        return this.raw().lesser(a.raw());
    }
}
exports.Sym = Sym;
exports.symbol = (obj1, obj2) => {
    return new Sym(obj1, obj2);
};
