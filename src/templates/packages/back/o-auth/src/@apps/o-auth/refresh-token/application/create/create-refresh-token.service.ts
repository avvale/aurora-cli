import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata, Jwt, Utils } from '@aurora-ts/core';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenExpiredRefreshToken,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
} from '../../domain/value-objects';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateRefreshTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
        private readonly jwtService: JwtService,
    ) {}

    async main(
        payload: {
            id: RefreshTokenId;
            accessTokenId: RefreshTokenAccessTokenId;
            expiredRefreshToken: RefreshTokenExpiredRefreshToken;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // compose refresh token
        const momentExpiredRefreshToken = payload.expiredRefreshToken.value ? Utils.now().add(payload.expiredRefreshToken.value, 'seconds') : null;
        const refreshTokenDate: Jwt = {
            jit: payload.id.value,
            aci: payload.accessTokenId.value,
            iss: 'Aurora OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: momentExpiredRefreshToken ? parseInt(momentExpiredRefreshToken.format('X')) : null,
        };
        const refreshTokenValue = new RefreshTokenToken(this.jwtService.sign(refreshTokenDate));

        // create aggregate with factory pattern
        const refreshToken = OAuthRefreshToken.register(
            payload.id,
            payload.accessTokenId,
            refreshTokenValue,
            new RefreshTokenIsRevoked(false),
            new RefreshTokenExpiresAt(momentExpiredRefreshToken ? momentExpiredRefreshToken.format('YYYY-MM-DD H:mm:ss') : null),
            new RefreshTokenCreatedAt({ currentTimestamp: true }),
            new RefreshTokenUpdatedAt({ currentTimestamp: true }),
            null,
        );

        await this.repository.create(refreshToken, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const refreshTokenRegister = this.publisher.mergeObjectContext(
            refreshToken,
        );

        refreshTokenRegister.created(refreshToken); // apply event to model events
        refreshTokenRegister.commit(); // commit all events of model
    }
}