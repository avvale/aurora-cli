import { OAuthAccessToken, OAuthIAccessTokenRepository } from '@app/o-auth/access-token';
import {
    OAuthAccessTokenAccountId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenDeletedAt,
    OAuthAccessTokenExpiredAccessToken,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenId,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenName,
    OAuthAccessTokenScopes,
    OAuthAccessTokenToken,
    OAuthAccessTokenUpdatedAt,
} from '@app/o-auth/access-token/domain/value-objects';
import { CQMetadata, Jwt, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthCreateAccessTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIAccessTokenRepository,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: {
            id: OAuthAccessTokenId;
            clientId: OAuthAccessTokenClientId;
            scopes: OAuthAccessTokenScopes;
            accountId: OAuthAccessTokenAccountId;
            name: OAuthAccessTokenName;
            expiredAccessToken: OAuthAccessTokenExpiredAccessToken;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // compose access token
        const momentExpiredAccessToken = payload.expiredAccessToken.value ?
            Utils.now().add(payload.expiredAccessToken.value, 'seconds') :
            null;
        const accessTokenPayload: Jwt = {
            jit: payload.id.value,
            aci: payload.accountId.value,
            iss: 'Aurora OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: momentExpiredAccessToken ?
                parseInt(momentExpiredAccessToken.format('X')) :
                null,
            scopes: Array.isArray(payload.scopes.value) ?
                payload.scopes.value.join(' ') :
                undefined,
        };

        const accessTokenValueObject = new OAuthAccessTokenToken(this.jwtService.sign(accessTokenPayload));

        // create aggregate with factory pattern
        const accessToken = OAuthAccessToken.register(
            payload.id,
            payload.clientId,
            payload.accountId,
            accessTokenValueObject,
            payload.name,
            new OAuthAccessTokenIsRevoked(false),
            new OAuthAccessTokenExpiresAt(
                momentExpiredAccessToken ?
                    momentExpiredAccessToken.format('YYYY-MM-DD H:mm:ss') :
                    null,
            ),
            new OAuthAccessTokenCreatedAt({ currentTimestamp: true }),
            new OAuthAccessTokenUpdatedAt({ currentTimestamp: true }),
            null,
        );

        await this.repository.create(
            accessToken,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accessTokenRegister = this.publisher.mergeObjectContext(
            accessToken,
        );

        accessTokenRegister.created(accessToken); // apply event to model events
        accessTokenRegister.commit(); // commit all events of model
    }
}
