/**
 * Error codes. Accessible using the `code` property on errors thrown by [[Link]] and [[LinkSession]].
 * - `E_DELIVERY`: Unable to request message to wallet.
 * - `E_TIMEOUT`: Request was delivered but user/wallet didn't respond in time.
 * - `E_CANCEL`: The [[LinkTransport]] canceled the request.
 * - `E_IDENTITY`: Identity proof failed to verify.
 */
export declare type LinkErrorCode = 'E_DELIVERY' | 'E_TIMEOUT' | 'E_CANCEL' | 'E_IDENTITY';
/**
 * Error that is thrown if a [[LinkTransport]] cancels a request.
 * @internal
 */
export declare class CancelError extends Error {
    code: string;
    constructor(reason?: string);
}
/**
 * Error that is thrown if an identity request fails to verify.
 * @internal
 */
export declare class IdentityError extends Error {
    code: string;
    constructor(reason?: string);
}
/**
 * Error originating from a [[LinkSession]].
 * @internal
 */
export declare class SessionError extends Error {
    code: 'E_DELIVERY' | 'E_TIMEOUT';
    constructor(reason: string, code: 'E_DELIVERY' | 'E_TIMEOUT');
}
