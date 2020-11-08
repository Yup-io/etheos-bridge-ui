import { SessionError } from './errors';
import { abiEncode, fetch, sealMessage } from './utils';
/**
 * Type describing a link session that can create a eosjs compatible
 * signature provider and transact for a specific auth.
 */
export class LinkSession {
    /**
     * Convenience, remove this session from associated [[Link]] storage if set.
     * Equivalent to:
     * ```ts
     * session.link.removeSession(session.identifier, session.auth)
     * ```
     */
    async remove() {
        if (this.link.storage) {
            await this.link.removeSession(this.identifier, this.auth);
        }
    }
    /** Restore a previously serialized session. */
    static restore(link, data) {
        switch (data.type) {
            case 'channel':
                return new LinkChannelSession(link, data.data, data.metadata);
            case 'fallback':
                return new LinkFallbackSession(link, data.data, data.metadata);
            default:
                throw new Error('Unable to restore, session data invalid');
        }
    }
}
/**
 * Link session that pushes requests over a channel.
 * @internal
 */
export class LinkChannelSession extends LinkSession {
    constructor(link, data, metadata) {
        super();
        this.type = 'channel';
        this.timeout = 2 * 60 * 1000; // ms
        this.link = link;
        this.auth = data.auth;
        this.publicKey = data.publicKey;
        this.channel = data.channel;
        this.identifier = data.identifier;
        this.encrypt = (request) => {
            return sealMessage(request.encode(true, false), data.requestKey, data.channel.key);
        };
        this.metadata = {
            ...(metadata || {}),
            timeout: this.timeout,
            name: this.channel.name,
        };
        this.serialize = () => ({
            type: 'channel',
            data,
            metadata: this.metadata,
        });
    }
    onSuccess(request, result) {
        if (this.link.transport.onSuccess) {
            this.link.transport.onSuccess(request, result);
        }
    }
    onFailure(request, error) {
        if (this.link.transport.onFailure) {
            this.link.transport.onFailure(request, error);
        }
    }
    onRequest(request, cancel) {
        const info = {
            expiration: new Date(Date.now() + this.timeout).toISOString().slice(0, -1),
        };
        if (this.link.transport.onSessionRequest) {
            this.link.transport.onSessionRequest(this, request, cancel);
        }
        setTimeout(() => {
            cancel(new SessionError('Wallet did not respond in time', 'E_TIMEOUT'));
        }, this.timeout + 500);
        request.data.info.push({
            key: 'link',
            value: abiEncode(info, 'link_info'),
        });
        fetch(this.channel.url, {
            method: 'POST',
            headers: {
                'X-Buoy-Wait': (this.timeout / 1000).toFixed(0),
            },
            body: this.encrypt(request),
        })
            .then((response) => {
            if (response.status !== 200) {
                cancel(new SessionError('Unable to push message', 'E_DELIVERY'));
            }
            else {
                // request delivered
            }
        })
            .catch((error) => {
            cancel(new SessionError(`Unable to reach link service (${error.message || String(error)})`, 'E_DELIVERY'));
        });
    }
    prepare(request) {
        if (this.link.transport.prepare) {
            return this.link.transport.prepare(request, this);
        }
        return Promise.resolve(request);
    }
    showLoading() {
        if (this.link.transport.showLoading) {
            return this.link.transport.showLoading();
        }
    }
    makeSignatureProvider() {
        return this.link.makeSignatureProvider([this.publicKey], this);
    }
    makeAuthorityProvider() {
        return this.link.makeAuthorityProvider();
    }
    transact(args, options) {
        return this.link.transact(args, options, this);
    }
}
/**
 * Link session that sends every request over the transport.
 * @internal
 */
export class LinkFallbackSession extends LinkSession {
    constructor(link, data, metadata) {
        super();
        this.type = 'fallback';
        this.link = link;
        this.auth = data.auth;
        this.publicKey = data.publicKey;
        this.metadata = metadata || {};
        this.identifier = data.identifier;
        this.serialize = () => ({
            type: this.type,
            data,
            metadata: this.metadata,
        });
    }
    onSuccess(request, result) {
        if (this.link.transport.onSuccess) {
            this.link.transport.onSuccess(request, result);
        }
    }
    onFailure(request, error) {
        if (this.link.transport.onFailure) {
            this.link.transport.onFailure(request, error);
        }
    }
    onRequest(request, cancel) {
        if (this.link.transport.onSessionRequest) {
            this.link.transport.onSessionRequest(this, request, cancel);
        }
        else {
            this.link.transport.onRequest(request, cancel);
        }
    }
    prepare(request) {
        if (this.link.transport.prepare) {
            return this.link.transport.prepare(request, this);
        }
        return Promise.resolve(request);
    }
    showLoading() {
        if (this.link.transport.showLoading) {
            return this.link.transport.showLoading();
        }
    }
    makeSignatureProvider() {
        return this.link.makeSignatureProvider([this.publicKey], this);
    }
    makeAuthorityProvider() {
        return this.link.makeAuthorityProvider();
    }
    transact(args, options) {
        return this.link.transact(args, options, this);
    }
}
//# sourceMappingURL=link-session.js.map