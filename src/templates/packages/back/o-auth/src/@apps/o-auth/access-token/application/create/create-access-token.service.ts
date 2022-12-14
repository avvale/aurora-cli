import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { CQMetadata, Jwt, Utils } from '@aurora-ts/core';
import {
    AccessTokenAccountId,
    AccessTokenClientId,
    AccessTokenScopes,
    AccessTokenCreatedAt,
    AccessTokenExpiredAccessToken,
    AccessTokenExpiresAt,
    AccessTokenId,
    AccessTokenIsRevoked,
    AccessTokenName,
    AccessTokenToken,
    AccessTokenUpdatedAt,
} from '../../domain/value-objects';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';

@Injectable()
export class CreateAccessTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: {
            id: AccessTokenId;
            clientId: AccessTokenClientId;
            scopes: AccessTokenScopes;
            accountId: AccessTokenAccountId;
            name: AccessTokenName;
            expiredAccessToken: AccessTokenExpiredAccessToken;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // compose access token
        const momentExpiredAccessToken = payload.expiredAccessToken.value ? Utils.now().add(payload.expiredAccessToken.value, 'seconds') : null;
        const accessTokenPayload: Jwt = {
            jit   : payload.id.value,
            aci   : payload.accountId.value,
            iss   : 'Aurora OAuth',
            iat   : parseInt(Utils.now().format('X')),
            nbf   : parseInt(Utils.now().format('X')),
            exp   : momentExpiredAccessToken ? parseInt(momentExpiredAccessToken.format('X')) : null,
            scopes: Array.isArray(payload.scopes.value) ? payload.scopes.value.join(' ') : undefined,
        };

        const accessTokenValueObject = new AccessTokenToken(this.jwtService.sign(accessTokenPayload));

        // create aggregate with factory pattern
        const accessToken = OAuthAccessToken.register(
            payload.id,
            payload.clientId,
            payload.accountId,
            accessTokenValueObject,
            payload.name,
            new AccessTokenIsRevoked(false),
            new AccessTokenExpiresAt(momentExpiredAccessToken ? momentExpiredAccessToken.format('YYYY-MM-DD H:mm:ss') : null),
            new AccessTokenCreatedAt({ currentTimestamp: true }),
            new AccessTokenUpdatedAt({ currentTimestamp: true }),
            null,
        );

        await this.repository.create(accessToken, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accessTokenRegister = this.publisher.mergeObjectContext(
            accessToken,
        );

        accessTokenRegister.created(accessToken); // apply event to model events
        accessTokenRegister.commit(); // commit all events of model
    }
}