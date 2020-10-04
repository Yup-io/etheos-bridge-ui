import { Bytes } from './link-abi';
/** @internal */
export declare const fetch: typeof globalThis.fetch;
/**
 * Helper to ABI encode value.
 * @internal
 */
export declare function abiEncode(value: any, typeName: string): Uint8Array;
/**
 * Helper to ABI decode data.
 * @internal
 */
export declare function abiDecode<ResultType = any>(data: Bytes, typeName: string): ResultType;
/**
 * Encrypt a message using AES and shared secret derived from given keys.
 * @internal
 */
export declare function sealMessage(message: string, privateKey: string, publicKey: string): Uint8Array;
/**
 * Ensure public key is in new PUB_ format.
 * @internal
 */
export declare function normalizePublicKey(key: string): string;
/**
 * Return true if given public keys are equal.
 * @internal
 */
export declare function publicKeyEqual(keyA: string, keyB: string): boolean;
/**
 * Generate a random private key.
 * Uses browser crypto if available, otherwise falls back to slow eosjs-ecc.
 * @internal
 */
export declare function generatePrivateKey(): Promise<any>;
