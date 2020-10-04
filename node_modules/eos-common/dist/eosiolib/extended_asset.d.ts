import { Name } from "./name";
import { Asset } from "./asset";
import { ExtendedSymbol } from "./extended_symbol";
import { BigInteger } from "big-integer";
/**
 * @class Stores the extended_asset
 * @brief Stores the extended_asset as a uint64_t value
 */
export declare class ExtendedAsset {
    get [Symbol.toStringTag](): string;
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof(): string;
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj: any): boolean;
    /**
     * The asset
     */
    quantity: Asset;
    /**
     * The owner of the asset
     */
    contract: Name;
    /**
     * Get the extended symbol of the asset
     *
     * @return extended_symbol - The extended symbol of the asset
     */
    get_extended_symbol(): ExtendedSymbol;
    /**
     * Extended asset which stores the information of the owner of the asset
     */
    constructor(a: Asset, c: Name);
    constructor(c: Name);
    constructor(v: number | bigint | BigInteger, s: ExtendedSymbol);
    constructor(s: ExtendedSymbol);
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(): string;
    /**
     * Multiplication assignment operator
     */
    times(a: ExtendedAsset | number | bigint | BigInteger): ExtendedAsset;
    static times(a: ExtendedAsset, b: ExtendedAsset | number | bigint | BigInteger): ExtendedAsset;
    /**
     * Division operator
     */
    div(a: ExtendedAsset | number | bigint | BigInteger): ExtendedAsset;
    static div(a: ExtendedAsset, b: ExtendedAsset | number | bigint | BigInteger): ExtendedAsset;
    /**
     * Subtraction operator
     */
    minus(a: ExtendedAsset | number | bigint | BigInteger): ExtendedAsset;
    static minus(a: ExtendedAsset, b: ExtendedAsset | number | bigint): ExtendedAsset;
    /**
     * Addition operator
     */
    plus(a: ExtendedAsset | number | bigint): ExtendedAsset;
    static plus(a: ExtendedAsset, b: ExtendedAsset | number | bigint): ExtendedAsset;
    /**
     * Less than operator
     */
    isLessThan(a: ExtendedAsset): boolean;
    static isLessThan(a: ExtendedAsset, b: ExtendedAsset): boolean;
    /**
     * Comparison operator
     */
    isEqual(a: ExtendedAsset): boolean;
    static isEqual(a: ExtendedAsset, b: ExtendedAsset): boolean;
    /**
     * Comparison operator
     */
    isNotEqual(a: ExtendedAsset): boolean;
    static isNotEqual(a: ExtendedAsset, b: ExtendedAsset): boolean;
    /**
     * Comparison operator
     */
    isLessThanOrEqual(a: ExtendedAsset): boolean;
    static isLessThanOrEqual(a: ExtendedAsset, b: ExtendedAsset): boolean;
    /**
     * Comparison operator
     */
    isGreaterThanOrEqual(a: ExtendedAsset): boolean;
    static isGreaterThanOrEqual(a: ExtendedAsset, b: ExtendedAsset): boolean;
}
export declare const extended_asset: {
    /**
     * Asset & Contract
     *
     * @example
     *
     * extended_asset( asset("1.0000 EOS"), name("eosio.token"))
     */
    (a?: Asset, c?: Name): ExtendedAsset;
    /**
     * Extended Symbol
     *
     * @example
     *
     * extended_asset( extended_symbol("4,EOS", "eosio.token") )
     */
    (s?: ExtendedSymbol): ExtendedAsset;
    /**
     * Contract
     *
     * @example
     *
     * extended_asset( name("eosio.token") )
     */
    (c?: Name): ExtendedAsset;
    /**
     * Value & Extended Symbol
     *
     * @example
     *
     * extended_asset( 10000, extended_symbol("4,EOS", "eosio.token"))
     */
    (v?: number | bigint | BigInteger, s?: ExtendedSymbol): ExtendedAsset;
};
