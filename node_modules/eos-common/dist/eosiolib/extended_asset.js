"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = require("./name");
const asset_1 = require("./asset");
const extended_symbol_1 = require("./extended_symbol");
const check_1 = require("./check");
const big_integer_1 = __importDefault(require("big-integer"));
const utils_1 = require("./utils");
/**
 * @class Stores the extended_asset
 * @brief Stores the extended_asset as a uint64_t value
 */
class ExtendedAsset {
    constructor(obj1, obj2) {
        /**
         * The asset
         */
        this.quantity = new asset_1.Asset();
        /**
         * The owner of the asset
         */
        this.contract = new name_1.Name();
        // Asset & Contract
        if (utils_1.getType(obj1) == "asset")
            this.quantity = obj1;
        if (utils_1.getType(obj2) == "name")
            this.contract = obj2;
        // Contract
        if (utils_1.getType(obj1) == "name")
            this.contract = obj1;
        // Value & Extended Symbol
        if (utils_1.getType(obj2) == "extended_symbol") {
            this.quantity = new asset_1.Asset(big_integer_1.default(obj1 || 0), obj2.get_symbol());
            this.contract = obj2.get_contract();
        }
        // Extended Symbol
        if (utils_1.getType(obj1) == "extended_symbol") {
            this.quantity = new asset_1.Asset(0, obj1.get_symbol());
            this.contract = obj1.get_contract();
        }
    }
    get [Symbol.toStringTag]() {
        return 'extended_asset';
    }
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof() { return 'extended_asset'; }
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj) { return obj instanceof ExtendedAsset; }
    /**
     * Get the extended symbol of the asset
     *
     * @return extended_symbol - The extended symbol of the asset
     */
    get_extended_symbol() { return new extended_symbol_1.ExtendedSymbol(this.quantity.symbol, this.contract); }
    // /**
    //  * %Print the extended asset
    //  */
    // public print(): void {
    //     this.quantity.print();
    //     process.stdout.write("@" + this.contract.to_string());
    // }
    /**
     * The toString() method returns the string representation of the object.
     */
    toString() {
        return `${this.quantity.to_string()}@${this.contract.to_string()}`;
    }
    /// @cond OPERATORS
    /**
     * Multiplication assignment operator
     */
    times(a) {
        const amount = utils_1.getAmount(a);
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(contract.raw().equals(this.contract.raw()), "type mismatch");
        this.quantity.times(amount);
        return this;
    }
    static times(a, b) {
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(a.contract.raw().equals(contract.raw()), "type mismatch");
        const result = new ExtendedAsset(a.quantity, a.contract);
        result.times(b);
        return result;
    }
    /**
     * Division operator
     */
    div(a) {
        const amount = utils_1.getAmount(a);
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(contract.raw().equals(this.contract.raw()), "type mismatch");
        this.quantity.div(amount);
        return this;
    }
    static div(a, b) {
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(a.contract.raw().equals(contract.raw()), "type mismatch");
        const result = new ExtendedAsset(a.quantity, a.contract);
        result.div(b);
        return result;
    }
    /**
     * Subtraction operator
     */
    minus(a) {
        const amount = utils_1.getAmount(a);
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(contract.raw().equals(this.contract.raw()), "type mismatch");
        this.quantity.minus(amount);
        return this;
    }
    static minus(a, b) {
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(a.contract.raw().equals(contract.raw()), "type mismatch");
        const result = new ExtendedAsset(a.quantity, a.contract);
        result.minus(b);
        return result;
    }
    /**
     * Addition operator
     */
    plus(a) {
        const amount = utils_1.getAmount(a);
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(contract.raw().equals(this.contract.raw()), "type mismatch");
        this.quantity.plus(amount);
        return this;
    }
    static plus(a, b) {
        const contract = utils_1.getContract(a);
        if (contract)
            check_1.check(a.contract.raw().equals(contract.raw()), "type mismatch");
        const result = new ExtendedAsset(a.quantity, a.contract);
        result.plus(b);
        return result;
    }
    /**
     * Less than operator
     */
    isLessThan(a) {
        check_1.check(a.contract.raw().equals(this.contract.raw()), "type mismatch");
        return this.quantity.isLessThan(a.quantity);
    }
    static isLessThan(a, b) {
        check_1.check(a.contract.raw().equals(b.contract.raw()), "type mismatch");
        return a.quantity.isLessThan(b.quantity);
    }
    /**
     * Comparison operator
     */
    isEqual(a) {
        return this.quantity.isEqual(a.quantity) && this.contract.isEqual(a.contract);
    }
    static isEqual(a, b) {
        return a.quantity.isEqual(b.quantity) && a.contract.isEqual(b.contract);
    }
    /**
     * Comparison operator
     */
    isNotEqual(a) {
        return this.quantity.isNotEqual(a.quantity) || this.contract.isNotEqual(a.contract);
    }
    static isNotEqual(a, b) {
        return a.quantity.isNotEqual(b.quantity) || a.contract.isNotEqual(b.contract);
    }
    /**
     * Comparison operator
     */
    isLessThanOrEqual(a) {
        check_1.check(a.contract.raw().equals(this.contract.raw()), "type mismatch");
        return this.quantity.isLessThanOrEqual(a.quantity);
    }
    static isLessThanOrEqual(a, b) {
        check_1.check(a.contract.raw().equals(b.contract.raw()), "type mismatch");
        return a.quantity.isLessThanOrEqual(b.quantity);
    }
    /**
     * Comparison operator
     */
    isGreaterThanOrEqual(a) {
        check_1.check(a.contract.raw().equals(this.contract.raw()), "type mismatch");
        return this.quantity.isGreaterThanOrEqual(a.quantity);
    }
    static isGreaterThanOrEqual(a, b) {
        check_1.check(a.contract.raw().equals(b.contract.raw()), "type mismatch");
        return a.quantity.isGreaterThanOrEqual(b.quantity);
    }
}
exports.ExtendedAsset = ExtendedAsset;
exports.extended_asset = (obj1, obj2) => {
    return new ExtendedAsset(obj1, obj2);
};
