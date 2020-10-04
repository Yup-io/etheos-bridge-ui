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
export declare function check(pred: boolean, msg: string): void;
