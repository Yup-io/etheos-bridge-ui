import bigInt, { BigInteger } from "big-integer";
/**
 * @class Stores the name
 * @brief Stores the name as a uint64_t value
 */
export declare class Name {
    get [Symbol.toStringTag](): string;
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof(): string;
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj: any): boolean;
    readonly value: bigInt.BigInteger;
    constructor(str?: string | number | BigInteger);
    /**
     *  Converts a %name Base32 symbol into its corresponding value
     *
     *  @param c - Character to be converted
     *  @return constexpr char - Converted value
     */
    static char_to_value(c: string): number;
    /**
     *  Returns the length of the %name
     */
    length(): number;
    /**
     *  Returns the suffix of the %name
     */
    suffix(): Name;
    /**
     * Returns uint64_t repreresentation of the name
     */
    raw(): BigInteger;
    /**
     * Explicit cast to bool of the name
     *
     * @return Returns true if the name is set to the default value of 0 else true.
     */
    bool(): boolean;
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(): string;
    to_string(): string;
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided name are the same
     */
    static isEqual(a: Name, b: Name): boolean;
    isEqual(a: Name): boolean;
    /**
     * Inverted equivalency operator. Returns true if a != b (are different)
     *
     * @return boolean - true if both provided name are not the same
     */
    static isNotEqual(a: Name, b: Name): boolean;
    isNotEqual(a: Name): boolean;
    /**
     * Less than operator. Returns true if a < b.
     * @brief Less than operator
     * @return boolean - true if name `a` is less than `b`
     */
    static isLessThan(a: Name, b: Name): boolean;
    isLessThan(a: Name): boolean;
}
export declare function name(str?: string | number | BigInteger): Name;
