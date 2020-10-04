"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("./symbol");
const asset_1 = require("./asset");
const big_integer_1 = __importDefault(require("big-integer"));
function getType(obj) {
    if (typeof obj == "object" && obj.typeof)
        return obj.typeof;
    return typeof obj;
}
exports.getType = getType;
function number_to_bigint(num) {
    return big_integer_1.default(Math.floor(Number(num.toFixed(0))));
}
exports.number_to_bigint = number_to_bigint;
function isNull(value) {
    return value == undefined || value == null;
}
exports.isNull = isNull;
function getAmount(obj) {
    if (obj.typeof == "asset")
        return obj.amount;
    if (obj.typeof == "extended_asset")
        return obj.quantity.amount;
    if (big_integer_1.default.isInstance(obj))
        return obj;
    if (typeof obj == "number")
        return number_to_bigint(obj);
    if (typeof obj == "bigint")
        return big_integer_1.default(obj);
    if (typeof obj == "string")
        return number_to_bigint(Number(obj));
    throw new Error("invalid getAmount param");
}
exports.getAmount = getAmount;
function getSymbol(obj) {
    if (obj.typeof == "symbol")
        return obj;
    if (obj.typeof == "asset")
        return obj.symbol;
    if (obj.typeof == "extended_asset")
        return obj.quantity.symbol;
    return null;
}
exports.getSymbol = getSymbol;
function getContract(obj) {
    if (obj.typeof == "extended_asset")
        return obj.contract;
    if (obj.typeof == "extended_symbol")
        return obj.get_contract();
    return null;
}
exports.getContract = getContract;
function asset_to_number(quantity) {
    const amount = getAmount(quantity);
    if (amount == big_integer_1.default(0))
        return Number(amount);
    const sym = getSymbol(quantity);
    if (sym)
        return Number(amount) / Math.pow(10, sym.precision());
    throw new Error("invalid quantity");
}
exports.asset_to_number = asset_to_number;
function number_to_asset(num, sym) {
    const symbol = getSymbol(sym);
    if (!symbol)
        throw new Error("invalid sym");
    const exp = Math.pow(10, symbol.precision());
    if (typeof num == "number")
        return new asset_1.Asset(Math.floor(num * exp), symbol);
    return new asset_1.Asset(getAmount(num).multiply(exp), symbol);
}
exports.number_to_asset = number_to_asset;
function asset_to_precision(quantity, precision) {
    return number_to_asset(asset_to_number(quantity), new symbol_1.Sym(quantity.symbol.code(), precision));
}
exports.asset_to_precision = asset_to_precision;
