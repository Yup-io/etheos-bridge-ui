import { SymbolCode } from "./symbol_code";
import bigInt, { BigInteger } from "big-integer";
export declare class Sym {
    get [Symbol.toStringTag](): string;
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof(): string;
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj: any): boolean;
    value: bigInt.BigInteger;
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
    constructor(sc?: string | Sym | SymbolCode | number | BigInteger, precision?: number);
    /**
     * Is this symbol valid
     */
    is_valid(): boolean;
    /**
     * This symbol's precision
     */
    precision(): number;
    /**
     * Returns representation of symbol name
     */
    code(): SymbolCode;
    /**
     * Returns uint64_t repreresentation of the symbol
     */
    raw(): BigInteger;
    /**
     * Explicit cast to bool of the symbol
     *
     * @return Returns true if the symbol is set to the default value of 0 else true.
     */
    bool(): boolean;
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(show_precision?: boolean): string;
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided symbol_codes are the same
     */
    static isEqual(a: Sym, b: Sym): boolean;
    isEqual(a: Sym): boolean;
    /**
     * Inverted equivalency operator. Returns true if a != b (are different)
     *
     * @return boolean - true if both provided symbol_codes are not the same
     */
    static isNotEqual(a: Sym, b: Sym): boolean;
    isNotEqual(a: Sym): boolean;
    /**
     * Less than operator. Returns true if a < b.
     * @brief Less than operator
     * @return boolean - true if symbol_code `a` is less than `b`
     */
    static isLessThan(a: Sym, b: Sym): boolean;
    isLessThan(a: Sym): boolean;
}
export declare const symbol: {
    /**
     * Symbol & String & Raw
     *
     * @example
     *
     * const sym = symbol("4,EOS")
     * symbol( sym )
     * symbol( 0 )
     */
    (sym?: Sym | string | number | BigInteger): Sym;
    /**
     * SymbolCode & Precision
     *
     * @example
     *
     * symbol( "EOS", 4 )
     */
    (sc?: string | SymbolCode, precision?: number): Sym;
};
