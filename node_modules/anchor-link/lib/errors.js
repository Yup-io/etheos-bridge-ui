/**
 * Error that is thrown if a [[LinkTransport]] cancels a request.
 * @internal
 */
export class CancelError extends Error {
    constructor(reason) {
        super(`User canceled request ${reason ? '(' + reason + ')' : ''}`);
        this.code = 'E_CANCEL';
    }
}
/**
 * Error that is thrown if an identity request fails to verify.
 * @internal
 */
export class IdentityError extends Error {
    constructor(reason) {
        super(`Unable to verify identity ${reason ? '(' + reason + ')' : ''}`);
        this.code = 'E_IDENTITY';
    }
}
/**
 * Error originating from a [[LinkSession]].
 * @internal
 */
export class SessionError extends Error {
    constructor(reason, code) {
        super(reason);
        this.code = code;
    }
}
//# sourceMappingURL=errors.js.map