import { Name } from "./name";
import { Sym } from "./symbol";
import { BigInteger } from "big-integer";
/**
 * @class Stores the extended_symbol
 * @brief Stores the extended_symbol as a uint64_t value
 */
export declare class ExtendedSymbol {
    get [Symbol.toStringTag](): string;
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof(): string;
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj: any): boolean;
    private sym;
    private contract;
    /**
     * Construct a new symbol_code object initialising symbol and contract with the passed in symbol and name
     *
     * @param sym - The symbol
     * @param con - The name of the contract
     * @example
     *
     * new ExtendedSymbol( symbol("4,EOS"), name("eosio.token") )
     */
    constructor(sym?: Sym | string, contract?: Name | string);
    /**
     * Returns the symbol in the extended_contract
     *
     * @return symbol
     */
    get_symbol(): Sym;
    /**
     * Returns the name of the contract in the extended_symbol
     *
     * @return name
     */
    get_contract(): Name;
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(show_precision?: boolean): string;
    /**
     * Returns uint128_t repreresentation of the extended symbol
     */
    raw(): BigInteger;
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided name are the same
     */
    static isEqual(a: ExtendedSymbol, b: ExtendedSymbol): boolean;
    isEqual(a: ExtendedSymbol): boolean;
    /**
     * Inverted equivalency operator. Returns true if a != b (are different)
     *
     * @return boolean - true if both provided name are not the same
     */
    static isNotEqual(a: ExtendedSymbol, b: ExtendedSymbol): boolean;
    isNotEqual(a: ExtendedSymbol): boolean;
    /**
     * Less than operator. Returns true if a < b.
     * @brief Less than operator
     * @return boolean - true if name `a` is less than `b`
     */
    static isLessThan(a: ExtendedSymbol, b: ExtendedSymbol): boolean;
    isLessThan(a: ExtendedSymbol): boolean;
}
/**
 * Extended Symbol
 *
 * @example
 *
 * extended_symbol( symbol("4,EOS"), name("eosio.token") )
 */
export declare function extended_symbol(sym?: Sym | string, contract?: Name | string): ExtendedSymbol;
