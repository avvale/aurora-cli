import { OAuthIRefreshTokenRepository, OAuthRefreshToken } from '@app/o-auth/refresh-token';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenDeletedAt,
    OAuthRefreshTokenExpiredRefreshToken,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenUpdatedAt,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CQMetadata, Jwt, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthCreateRefreshTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIRefreshTokenRepository,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: {
            id: OAuthRefreshTokenId;
            accessTokenId: OAuthRefreshTokenAccessTokenId;
            expiredRefreshToken: OAuthRefreshTokenExpiredRefreshToken;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // compose refresh token
        const momentExpiredRefreshToken = payload.expiredRefreshToken.value ?
            Utils.now().add(payload.expiredRefreshToken.value, 'seconds') :
            null;
        const refreshTokenDate: Jwt = {
            jit: payload.id.value,
            aci: payload.accessTokenId.value,
            iss: 'Aurora OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: momentExpiredRefreshToken ?
                parseInt(momentExpiredRefreshToken.format('X')) :
                null,
        };
        const refreshTokenValue = new OAuthRefreshTokenToken(this.jwtService.sign(refreshTokenDate));

        // create aggregate with factory pattern
        const refreshToken = OAuthRefreshToken.register(
            payload.id,
            payload.accessTokenId,
            refreshTokenValue,
            new OAuthRefreshTokenIsRevoked(false),
            new OAuthRefreshTokenExpiresAt(
                momentExpiredRefreshToken ?
                    momentExpiredRefreshToken.format('YYYY-MM-DD H:mm:ss') :
                    null,
            ),
            new OAuthRefreshTokenCreatedAt({ currentTimestamp: true }),
            new OAuthRefreshTokenUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            refreshToken,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const refreshTokenRegister = this.publisher.mergeObjectContext(
            refreshToken,
        );

        refreshTokenRegister.created(refreshToken); // apply event to model events
        refreshTokenRegister.commit(); // commit all events of model
    }
}
