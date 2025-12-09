import { OAuthCredential } from '@app/o-auth/credential';
import {
    OAuthCredentialAccessTokenId,
    OAuthCredentialAccountId,
    OAuthCredentialClientSecret,
    OAuthCredentialGrantType,
    OAuthCredentialRedirect,
    OAuthCredentialRefreshToken,
    OAuthCredentialUsername,
} from '@app/o-auth/credential/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthCreateCredentialService {
    constructor(private readonly publisher: EventPublisher) {}

    async main(
        payload: {
            grantType: OAuthCredentialGrantType;
            accountId: OAuthCredentialAccountId;
            username: OAuthCredentialUsername;
            clientSecret: OAuthCredentialClientSecret;
            accessTokenId: OAuthCredentialAccessTokenId;
            refreshToken: OAuthCredentialRefreshToken;
            redirect: OAuthCredentialRedirect;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const credential = OAuthCredential.register(
            payload.grantType,
            payload.accountId,
            payload.username,
            payload.clientSecret,
            payload.accessTokenId,
            payload.refreshToken,
            payload.redirect,
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const credentialRegister =
            this.publisher.mergeObjectContext(credential);

        credentialRegister.created(credential); // apply event to model events
        credentialRegister.commit(); // commit all events of model
    }
}
