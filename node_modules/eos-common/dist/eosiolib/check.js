"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Assert if the predicate fails and use the supplied message.
 *
 * @param {boolean} pred Pre-condition
 * @param {string} msg Error Message
 * @returns {void}
 * @example
 *
 * check(a == b, "a does not equal b");
 */
function check(pred, msg) {
    if (!pred) {
        throw new Error(msg);
    }
}
exports.check = check;
