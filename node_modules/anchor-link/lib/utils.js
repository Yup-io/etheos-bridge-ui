import { Numeric, Serialize } from 'eosjs';
import * as ecc from 'eosjs-ecc';
import makeFetch from 'fetch-ponyfill';
import linkAbi from './link-abi-data';
/** @internal */
export const fetch = makeFetch().fetch;
/** @internal */
const types = Serialize.getTypesFromAbi(Serialize.createInitialTypes(), linkAbi);
/**
 * Helper to ABI encode value.
 * @internal
 */
export function abiEncode(value, typeName) {
    let type = types.get(typeName);
    if (!type) {
        throw new Error(`No such type: ${typeName}`);
    }
    let buf = new Serialize.SerialBuffer();
    type.serialize(buf, value);
    return buf.asUint8Array();
}
/**
 * Helper to ABI decode data.
 * @internal
 */
export function abiDecode(data, typeName) {
    let type = types.get(typeName);
    if (!type) {
        throw new Error(`No such type: ${typeName}`);
    }
    if (typeof data === 'string') {
        data = Serialize.hexToUint8Array(data);
    }
    else if (!(data instanceof Uint8Array)) {
        data = new Uint8Array(data);
    }
    let buf = new Serialize.SerialBuffer({
        array: data,
    });
    return type.deserialize(buf);
}
/**
 * Encrypt a message using AES and shared secret derived from given keys.
 * @internal
 */
export function sealMessage(message, privateKey, publicKey) {
    const res = ecc.Aes.encrypt(privateKey, publicKey, message);
    const data = {
        from: ecc.privateToPublic(privateKey),
        nonce: res.nonce.toString(),
        ciphertext: res.message,
        checksum: res.checksum,
    };
    return abiEncode(data, 'sealed_message');
}
/**
 * Ensure public key is in new PUB_ format.
 * @internal
 */
export function normalizePublicKey(key) {
    if (key.startsWith('PUB_')) {
        return key;
    }
    return Numeric.publicKeyToString(Numeric.stringToPublicKey('EOS' + key.substr(-50)));
}
/**
 * Return true if given public keys are equal.
 * @internal
 */
export function publicKeyEqual(keyA, keyB) {
    return normalizePublicKey(keyA) === normalizePublicKey(keyB);
}
/**
 * Generate a random private key.
 * Uses browser crypto if available, otherwise falls back to slow eosjs-ecc.
 * @internal
 */
export async function generatePrivateKey() {
    if (typeof window !== 'undefined' && window.crypto) {
        const data = new Uint32Array(32);
        window.crypto.getRandomValues(data);
        return ecc.PrivateKey.fromBuffer(Buffer.from(data)).toString();
    }
    else {
        return await ecc.randomKey();
    }
}
//# sourceMappingURL=utils.js.map