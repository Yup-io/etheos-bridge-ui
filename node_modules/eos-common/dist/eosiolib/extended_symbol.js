"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name_1 = require("./name");
const symbol_1 = require("./symbol");
/**
 * @class Stores the extended_symbol
 * @brief Stores the extended_symbol as a uint64_t value
 */
class ExtendedSymbol {
    /**
     * Construct a new symbol_code object initialising symbol and contract with the passed in symbol and name
     *
     * @param sym - The symbol
     * @param con - The name of the contract
     * @example
     *
     * new ExtendedSymbol( symbol("4,EOS"), name("eosio.token") )
     */
    constructor(sym, contract) {
        this.sym = new symbol_1.Sym();
        this.contract = new name_1.Name();
        if (sym)
            this.sym = typeof sym == "string" ? new symbol_1.Sym(sym) : sym;
        if (contract)
            this.contract = typeof contract == "string" ? new name_1.Name(contract) : contract;
    }
    get [Symbol.toStringTag]() {
        return 'extended_symbol';
    }
    /**
     * The typeof operator returns a string indicating the type of the unevaluated operand.
     */
    get typeof() { return 'extended_symbol'; }
    /**
     * The isinstance() function returns True if the specified object is of the specified type, otherwise False.
     */
    static isInstance(obj) { return obj instanceof ExtendedSymbol; }
    /**
     * Returns the symbol in the extended_contract
     *
     * @return symbol
     */
    get_symbol() { return this.sym; }
    /**
     * Returns the name of the contract in the extended_symbol
     *
     * @return name
     */
    get_contract() { return this.contract; }
    // /**
    //  * %Print the extended symbol
    //  *
    //  * @brief %Print the extended symbol
    //  */
    // public print( show_precision = true ): void {
    //     this.sym.print( show_precision );
    //     process.stdout.write("@" + this.contract.to_string() );
    // }
    /**
     * The toString() method returns the string representation of the object.
     */
    toString(show_precision = true) {
        return `${this.sym.toString(show_precision)}@${this.contract.to_string()}`;
    }
    /**
     * Returns uint128_t repreresentation of the extended symbol
     */
    raw() {
        return this.contract.value.shiftLeft(64).or(this.sym.code().raw());
    }
    /**
     * Equivalency operator. Returns true if a == b (are the same)
     *
     * @return boolean - true if both provided name are the same
     */
    static isEqual(a, b) {
        return a.get_contract().raw().equals(b.get_contract().raw()) && a.get_symbol().raw().equals(b.get_symbol().raw());
    }
    isEqual(a) {
        return a.get_contract().raw().equals(this.get_contract().raw()) && a.get_symbol().raw().equals(this.get_symbol().raw());
    }
    /**
     * Inverted equivalency operator. Returns true if a != b (are different)
     *
     * @return boolean - true if both provided name are not the same
     */
    static isNotEqual(a, b) {
        return a.get_contract().raw().notEquals(b.get_contract().raw()) || a.get_symbol().raw().notEquals(b.get_symbol().raw());
    }
    isNotEqual(a) {
        return a.get_contract().raw().notEquals(this.get_contract().raw()) || a.get_symbol().raw().notEquals(this.get_symbol().raw());
    }
    /**
     * Less than operator. Returns true if a < b.
     * @brief Less than operator
     * @return boolean - true if name `a` is less than `b`
     */
    static isLessThan(a, b) {
        return a.get_contract().raw().lesser(b.get_contract().raw()) || a.get_symbol().raw().lesser(b.get_symbol().raw());
    }
    isLessThan(a) {
        return this.get_contract().raw().lesser(a.get_contract().raw()) || this.get_symbol().raw().lesser(a.get_symbol().raw());
    }
}
exports.ExtendedSymbol = ExtendedSymbol;
/**
 * Extended Symbol
 *
 * @example
 *
 * extended_symbol( symbol("4,EOS"), name("eosio.token") )
 */
function extended_symbol(sym, contract) {
    return new ExtendedSymbol(sym, contract);
}
exports.extended_symbol = extended_symbol;
