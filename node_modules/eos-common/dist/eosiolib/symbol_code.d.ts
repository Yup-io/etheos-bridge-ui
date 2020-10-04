import { BigInteger } from "big-integer";
/**
 * @class Stores the symbol code
 * @brief Stores the symbol code as a uint64_t value
 */
export declare class SymbolCode {
    get [Symbol.toStringTag](): string;
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof(): string;
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj: any): boolean;
    private value;
    constructor(obj?: string | number | BigInteger | SymbolCode);
    raw(): BigInteger;
    isTruthy(): boolean;
    isFalsy(): boolean;
    length(): number;
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(): string;
    to_string(): string;
    is_valid(): boolean;
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided symbol_codes are the same
     */
    isEqual(comparison: SymbolCode): boolean;
    /**
     * Inverted equivalency operator. Returns true if a != b (are different)
     *
     * @return boolean - true if both provided symbol_codes are not the same
     */
    isNotEqual(comparison: SymbolCode): boolean;
    /**
     * Less than operator. Returns true if a < b.
     * @brief Less than operator
     * @return boolean - true if symbol_code `a` is less than `b`
     */
    isLessThan(comparison: SymbolCode): boolean;
}
export declare function symbol_code(obj?: string | number | BigInteger | SymbolCode): SymbolCode;
