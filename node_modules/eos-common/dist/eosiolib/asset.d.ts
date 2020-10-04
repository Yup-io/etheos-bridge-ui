import { Sym } from "./symbol";
import bigInt, { BigInteger } from "big-integer";
/**
 * Asset
 *
 * @name Asset
 * @param {number} amount The amount of the asset
 * @param {Symbol} sym  The name of the symbol
 * @returns {Asset} Asset
 * @example
 *
 * const quantity = new Asset(10000, new Symbol("EOS", 4));
 * quantity.toString() //=> "1.0000 EOS";
 * quantity.symbol.code() //=> "EOS"
 * quantity.symbol.precision //=> 4
 */
export declare class Asset {
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
     * {constexpr int64_t} Maximum amount possible for this asset. It's capped to 2^62 - 1
     */
    static max_amount: bigInt.BigInteger;
    /**
     * {int64_t} The amount of the asset
     */
    amount: bigInt.BigInteger;
    /**
     * {symbol} The symbol name of the asset
     */
    symbol: Sym;
    /**
     * Construct a new asset given the symbol name and the amount
     */
    constructor(obj1?: string | number | BigInteger | bigint | Asset, obj2?: Sym);
    /**
     * Check if the amount doesn't exceed the max amount
     *
     * @return true - if the amount doesn't exceed the max amount
     * @return false - otherwise
     */
    is_amount_within_range(): boolean;
    /**
     * Check if the asset is valid. %A valid asset has its amount <= max_amount and its symbol name valid
     *
     * @return true - if the asset is valid
     * @return false - otherwise
     */
    is_valid(): boolean;
    /**
     * Set the amount of the asset
     *
     * @param a - New amount for the asset
     */
    set_amount(amount: BigInteger | number): void;
    /**
     * Subtraction assignment operator
     *
     * @param a - Another asset to subtract this asset with
     * @return asset& - Reference to this asset
     * @post The amount of this asset is subtracted by the amount of asset a
     */
    minus(a: Asset | number | bigint | BigInteger): Asset;
    /**
     * Addition Assignment  operator
     *
     * @param a - Another asset to subtract this asset with
     * @return asset& - Reference to this asset
     * @post The amount of this asset is added with the amount of asset a
     */
    plus(a: Asset | number | bigint | BigInteger): Asset;
    /**
     * Addition operator
     *
     * @param a - The first asset to be added
     * @param b - The second asset to be added
     * @return asset - New asset as the result of addition
     */
    static plus(a: Asset, b: Asset | number | bigint | BigInteger): Asset;
    /**
     * Subtraction operator
     *
     * @param a - The asset to be subtracted
     * @param b - The asset used to subtract
     * @return asset - New asset as the result of subtraction of a with b
     */
    static minus(a: Asset, b: Asset | number | bigint | BigInteger): Asset;
    /**
     * Multiplication assignment operator, with a number
     *
     * @details Multiplication assignment operator. Multiply the amount of this asset with a number and then assign the value to itself.
     * @param a - The multiplier for the asset's amount
     * @return asset - Reference to this asset
     * @post The amount of this asset is multiplied by a
     */
    times(a: Asset | number | bigint | BigInteger): Asset;
    /**
     * Multiplication operator, with a number proceeding
     *
     * @brief Multiplication operator, with a number proceeding
     * @param a - The asset to be multiplied
     * @param b - The multiplier for the asset's amount
     * @return asset - New asset as the result of multiplication
     */
    static times(a: Asset, b: Asset | number | bigint | BigInteger): Asset;
    /**
     * @brief Division assignment operator, with a number
     *
     * @details Division assignment operator. Divide the amount of this asset with a number and then assign the value to itself.
     * @param a - The divisor for the asset's amount
     * @return asset - Reference to this asset
     * @post The amount of this asset is divided by a
     */
    div(a: Asset | number | bigint | BigInteger): Asset;
    /**
     * Division operator, with a number proceeding
     *
     * @param a - The asset to be divided
     * @param b - The divisor for the asset's amount
     * @return asset - New asset as the result of division
     */
    static div(a: Asset, b: Asset | number | bigint | BigInteger): Asset;
    /**
     * Equality operator
     *
     * @param a - The first asset to be compared
     * @param b - The second asset to be compared
     * @return true - if both asset has the same amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    static isEqual(a: Asset, b: Asset): boolean;
    isEqual(a: Asset): boolean;
    /**
     * Inequality operator
     *
     * @param a - The first asset to be compared
     * @param b - The second asset to be compared
     * @return true - if both asset doesn't have the same amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    static isNotEqual(a: Asset, b: Asset): boolean;
    isNotEqual(a: Asset): boolean;
    /**
     * Less than operator
     *
     * @param a - The first asset to be compared
     * @param b - The second asset to be compared
     * @return true - if the first asset's amount is less than the second asset amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    static isLessThan(a: Asset, b: Asset): boolean;
    isLessThan(a: Asset): boolean;
    /**
     * Less or equal to operator
     *
     * @param a - The first asset to be compared
     * @param b - The second asset to be compared
     * @return true - if the first asset's amount is less or equal to the second asset amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    static isLessThanOrEqual(a: Asset, b: Asset): boolean;
    isLessThanOrEqual(a: Asset): boolean;
    /**
     * Greater than operator
     *
     * @param a - The first asset to be compared
     * @param b - The second asset to be compared
     * @return true - if the first asset's amount is greater than the second asset amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    static isGreaterThan(a: Asset, b: Asset): boolean;
    isGreaterThan(a: Asset): boolean;
    /**
     * Greater or equal to operator
     *
     * @param a - The first asset to be compared
     * @param b - The second asset to be compared
     * @return true - if the first asset's amount is greater or equal to the second asset amount
     * @return false - otherwise
     * @pre Both asset must have the same symbol
     */
    static isGreaterThanOrEqual(a: Asset, b: Asset): boolean;
    isGreaterThanOrEqual(a: Asset): boolean;
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(): string;
    to_string(): string;
}
export declare const asset: {
    /**
     * String
     *
     * @example
     *
     * const quantity = asset( "1.0000 EOS" )
     * asset( quantity )
     */
    (asset?: Asset | string): Asset;
    /**
     * Amount & Sym
     *
     * @example
     *
     * asset( 10000, symbol("4,EOS") )
     */
    (amount?: number | bigint | BigInteger, sym?: Sym): Asset;
};
