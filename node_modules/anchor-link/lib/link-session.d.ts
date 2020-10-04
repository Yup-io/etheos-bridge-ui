import { ApiInterfaces } from 'eosjs';
import { Link, PermissionLevel, TransactArgs, TransactOptions, TransactResult } from './link';
import { LinkTransport } from './link-transport';
/**
 * Type describing a link session that can create a eosjs compatible
 * signature provider and transact for a specific auth.
 */
export declare abstract class LinkSession {
    /** The underlying link instance used by the session. */
    abstract link: Link;
    /** App identifier that owns the session. */
    abstract identifier: string;
    /** The public key the session can sign for. */
    abstract publicKey: string;
    /** The EOSIO auth (a.k.a. permission level) the session can sign for. */
    abstract auth: {
        actor: string;
        permission: string;
    };
    /** Session type, e.g. 'channel'.  */
    abstract type: string;
    /** Arbitrary metadata that will be serialized with the session. */
    abstract metadata: {
        [key: string]: any;
    };
    /** Creates a eosjs compatible authority provider. */
    abstract makeAuthorityProvider(): ApiInterfaces.AuthorityProvider;
    /** Creates a eosjs compatible signature provider that can sign for the session public key. */
    abstract makeSignatureProvider(): ApiInterfaces.SignatureProvider;
    /**
     * Transact using this session. See [[Link.transact]].
     */
    abstract transact(args: TransactArgs, options?: TransactOptions): Promise<TransactResult>;
    /** Returns a JSON-encodable object that can be used recreate the session. */
    abstract serialize(): SerializedLinkSession;
    /**
     * Convenience, remove this session from associated [[Link]] storage if set.
     * Equivalent to:
     * ```ts
     * session.link.removeSession(session.identifier, session.auth)
     * ```
     */
    remove(): Promise<void>;
    /** Restore a previously serialized session. */
    static restore(link: Link, data: SerializedLinkSession): LinkSession;
}
/** @internal */
export interface SerializedLinkSession {
    type: string;
    metadata: {
        [key: string]: any;
    };
    data: any;
}
/** @internal */
interface ChannelInfo {
    /** Public key requests are encrypted to. */
    key: string;
    /** The wallet given channel name, usually the device name. */
    name: string;
    /** The channel push url. */
    url: string;
}
/** @internal */
export interface LinkChannelSessionData {
    /** App identifier that owns the session. */
    identifier: string;
    /** Authenticated user permission. */
    auth: PermissionLevel;
    /** Public key of authenticated user */
    publicKey: string;
    /** The wallet channel url. */
    channel: ChannelInfo;
    /** The private request key. */
    requestKey: string;
}
/**
 * Link session that pushes requests over a channel.
 * @internal
 */
export declare class LinkChannelSession extends LinkSession implements LinkTransport {
    readonly link: Link;
    readonly auth: PermissionLevel;
    readonly identifier: string;
    readonly type = "channel";
    readonly metadata: any;
    readonly publicKey: string;
    serialize: () => SerializedLinkSession;
    private channel;
    private timeout;
    private encrypt;
    constructor(link: Link, data: LinkChannelSessionData, metadata: any);
    onSuccess(request: any, result: any): void;
    onFailure(request: any, error: any): void;
    onRequest(request: any, cancel: any): void;
    prepare(request: any): Promise<any>;
    showLoading(): void;
    makeSignatureProvider(): ApiInterfaces.SignatureProvider;
    makeAuthorityProvider(): ApiInterfaces.AuthorityProvider;
    transact(args: TransactArgs, options?: TransactOptions): Promise<TransactResult>;
}
/** @internal */
export interface LinkFallbackSessionData {
    auth: {
        actor: string;
        permission: string;
    };
    publicKey: string;
    identifier: string;
}
/**
 * Link session that sends every request over the transport.
 * @internal
 */
export declare class LinkFallbackSession extends LinkSession implements LinkTransport {
    readonly link: Link;
    readonly auth: {
        actor: string;
        permission: string;
    };
    readonly type = "fallback";
    readonly identifier: string;
    readonly metadata: {
        [key: string]: any;
    };
    readonly publicKey: string;
    serialize: () => SerializedLinkSession;
    constructor(link: Link, data: LinkFallbackSessionData, metadata: any);
    onSuccess(request: any, result: any): void;
    onFailure(request: any, error: any): void;
    onRequest(request: any, cancel: any): void;
    prepare(request: any): Promise<any>;
    showLoading(): void;
    makeSignatureProvider(): ApiInterfaces.SignatureProvider;
    makeAuthorityProvider(): ApiInterfaces.AuthorityProvider;
    transact(args: TransactArgs, options?: TransactOptions): Promise<TransactResult>;
}
export {};
